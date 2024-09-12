import { DATABASE_TABLE } from "@application/config/tables";
import type { IDatabaseClient } from "@application/database/database";
import { AppError } from "@application/errors/app-error";
import type { User } from "@core/domain/user";
import type { IUserRepository, UserDynamoDB } from "./types";

export class UserRepository implements IUserRepository {
	private TABLE_NAME = DATABASE_TABLE.TABLE_NAME;
	private DEFAULT_USER_ID = "USER";

	constructor(private readonly dbInstance: IDatabaseClient) {}

	async create(
		createInput: Omit<User, "createdAt" | "updatedAt">,
	): Promise<User> {
		const { PK, SK } = this.getKeys(createInput.id);
		const now = new Date().toISOString();

		const newUser: UserDynamoDB = {
			account_confirmation: createInput.accountConfirmation,
			email: createInput.email,
			name: createInput.name,
			role: createInput.role,
			id: createInput.id,
			created_at: now,
			updated_at: now,
			PK,
			SK,
		};

		await this.dbInstance.create({
			...newUser,
		});

		return this.mapToDomain(newUser);
	}

	async getByEmail(email: string): Promise<User | undefined> {
		const items = await this.dbInstance.query<UserDynamoDB[]>({
			IndexName: "EmailIndex",
			KeyConditionExpression: "email = :email",
			ExpressionAttributeValues: {
				":email": email,
			},
		});

		const hasItem = items?.[0];

		return hasItem ? this.mapToDomain(hasItem) : undefined;
	}

	async update(id: string, updateInput: Omit<User, "id">): Promise<User> {
		const { PK, SK } = this.getKeys(id);

		const now = new Date().toISOString();

		try {
			await this.dbInstance.update({
				Key: { PK, SK },
				UpdateExpression:
					"set #name = :name, #email = :email, #account_confirmation = :account_confirmation, #updated_at = :updated_at",
				ExpressionAttributeNames: {
					"#name": "name",
					"#email": "email",
					"#account_confirmation": "account_confirmation",
					"#updated_at": "updated_at",
				},
				ExpressionAttributeValues: {
					":name": updateInput.name,
					":email": updateInput.email,
					":account_confirmation": updateInput.accountConfirmation,
					":updated_at": now,
				},
			});

			const user: UserDynamoDB = {
				...updateInput,
				created_at: updateInput.createdAt,
				updated_at: now,
				account_confirmation: updateInput.accountConfirmation,
				id,
				PK,
				SK,
			};

			return this.mapToDomain(user);
		} catch {
			throw new AppError("User not found", 404);
		}
	}

	async getById(id: string): Promise<User | undefined> {
		const { PK, SK } = this.getKeys(id);

		const item = await this.dbInstance.get<UserDynamoDB>({
			Key: { PK, SK },
		});

		return item ? this.mapToDomain(item) : undefined;
	}

	async getAll(): Promise<User[]> {
		const { PK } = this.getKeys("fakeId");
		const SK = "PROFILE|";

		const users = await this.dbInstance.query<UserDynamoDB[]>({
			KeyConditionExpression: "PK = :primaryKey and begins_with(SK, :sortKey)",
			ExpressionAttributeValues: {
				":sortKey": SK,
				":primaryKey": PK,
			},
		});

		return users ? users.map(this.mapToDomain) : [];
	}

	private mapToDomain(item: UserDynamoDB): User {
		return {
			email: item.email,
			id: item.id,
			name: item.name,
			role: item.role,
			accountConfirmation: item.account_confirmation,
			createdAt: item.created_at,
			updatedAt: item.updated_at,
		};
	}

	private getKeys(id: string): { PK: string; SK: string } {
		return {
			SK: `PROFILE|${id}`,
			PK: "USER",
		};
	}
}

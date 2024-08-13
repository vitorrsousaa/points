import { DATABASE_TABLE } from "@application/config/tables";
import type { IDatabaseClient } from "@application/database/database";
import { AppError } from "@application/errors/app-error";
import type { User } from "@core/domain/user";
import type { IUserRepository, UserDynamoDB } from "./types";

export class UserRepository implements IUserRepository {
	private TABLE_NAME = DATABASE_TABLE.TABLE_NAME;
	private DEFAULT_USER_ID = "USER";

	constructor(private readonly dbInstance: IDatabaseClient) {}

	async create(createInput: User): Promise<User> {
		const { PK, SK } = this.getKeys(createInput.id);

		const newUser: UserDynamoDB = {
			account_confirmation: createInput.accountConfirmation,
			email: createInput.email,
			name: createInput.name,
			role: createInput.role,
			id: createInput.id,
			PK,
			SK,
		};

		await this.dbInstance.create(this.TABLE_NAME, {
			...newUser,
		});

		return this.mapToDomain(newUser);
	}

	async getByEmail(email: string): Promise<User | undefined> {
		const items = await this.dbInstance.query<UserDynamoDB[]>(this.TABLE_NAME, {
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

		try {
			await this.dbInstance.update(this.TABLE_NAME, {
				Key: { PK, SK },
				UpdateExpression:
					"set #name = :name, #email = :email, #account_confirmation = :account_confirmation",
				ExpressionAttributeNames: {
					"#name": "name",
					"#email": "email",
					"#account_confirmation": "account_confirmation",
				},
				ExpressionAttributeValues: {
					":name": updateInput.name,
					":email": updateInput.email,
					":account_confirmation": updateInput.accountConfirmation,
				},
			});

			const user: UserDynamoDB = {
				...updateInput,
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

		const item = await this.dbInstance.get<UserDynamoDB>(this.TABLE_NAME, {
			Key: { PK, SK },
		});

		return item ? this.mapToDomain(item) : undefined;
	}

	private mapToDomain(item: UserDynamoDB): User {
		return {
			email: item.email,
			id: this.getUserId(item.SK),
			name: item.name,
			role: item.role,
			accountConfirmation: item.account_confirmation,
		};
	}

	private getKeys(id: string): { PK: string; SK: string } {
		return {
			PK: this.DEFAULT_USER_ID,
			SK: this.setUserId(id),
		};
	}

	private getUserId(userId: string): string {
		return userId.split("|")[1];
	}

	private setUserId(id: string): string {
		return `${this.DEFAULT_USER_ID}|${id}`;
	}
}

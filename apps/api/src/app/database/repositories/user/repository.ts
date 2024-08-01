import { DATABASE_TABLE } from "@application/config/tables";
import type { IDatabaseClient } from "@application/database/database";
import { AppError } from "@application/errors/app-error";
import type { User } from "@core/domain/user";
import type { IUserRepository, UserDynamoDB, UserPersistance } from "./types";

export class UserRepository implements IUserRepository {
	private TABLE_NAME = DATABASE_TABLE.USERS;
	private DEFAULT_USER_ID = "USER";

	constructor(private readonly dbInstance: IDatabaseClient) {}

	async create(createInput: UserPersistance): Promise<User> {
		const { PK, SK } = this.getKeys(createInput.id);

		const newUser: UserDynamoDB = {
			accountConfirmation: createInput.accountConfirmation,
			email: createInput.email,
			name: createInput.name,
			role: createInput.role,
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

	async update(
		id: string,
		updateInput: Omit<UserPersistance, "SK" | "PK">,
	): Promise<User> {
		const { PK, SK } = this.getKeys(id);

		try {
			await this.dbInstance.update(this.TABLE_NAME, {
				Key: { PK, SK },
				UpdateExpression:
					"set #name = :name, #email = :email, #accountConfirmation = :accountConfirmation",
				ExpressionAttributeNames: {
					"#name": "name",
					"#email": "email",
					"#accountConfirmation": "accountConfirmation",
				},
				ExpressionAttributeValues: {
					":name": updateInput.name,
					":email": updateInput.email,
					":accountConfirmation": updateInput.accountConfirmation,
				},
			});

			const user = { ...updateInput, PK, SK };

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
			accountConfirmation: item.accountConfirmation,
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

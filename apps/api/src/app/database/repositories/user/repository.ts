import { DATABASE_TABLE } from "@application/config/tables";
import type { IDatabaseClient } from "@application/database/database";
import { AppError } from "@application/errors/app-error";
import type { User } from "@core/domain/user";
import type { IUserRepository, UserPersistance } from "./types";

export class UserRepository implements IUserRepository {
	private TABLE_NAME = DATABASE_TABLE.USERS;

	constructor(private readonly dbInstance: IDatabaseClient) {}

	async create(createInput: UserPersistance): Promise<User> {
		await this.dbInstance.create(this.TABLE_NAME, {
			...createInput,
		});

		return this.mapToDomain(createInput);
	}

	async getByEmail(email: string): Promise<User | undefined> {
		const items = await this.dbInstance.query<UserPersistance[]>(
			this.TABLE_NAME,
			{
				IndexName: "EmailIndex",
				KeyConditionExpression: "email = :email",
				ExpressionAttributeValues: {
					":email": email,
				},
			},
		);

		const hasItem = items?.[0];

		return hasItem ? this.mapToDomain(hasItem) : undefined;
	}

	async update(
		id: string,
		updateInput: Omit<UserPersistance, "id">,
	): Promise<User> {
		try {
			await this.dbInstance.update(this.TABLE_NAME, {
				Key: { id },
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

			const user = { ...updateInput, id };

			return this.mapToDomain(user);
		} catch {
			throw new AppError("User not found", 404);
		}
	}

	async getById(id: string): Promise<User | undefined> {
		const item = await this.dbInstance.get<UserPersistance>(this.TABLE_NAME, {
			Key: { id },
		});

		return item ? this.mapToDomain(item) : undefined;
	}

	private mapToDomain(item: UserPersistance): User {
		return {
			email: item.email,
			id: item.id,
			name: item.name,
			role: item.role,
			accountConfirmation: item.accountConfirmation,
		};
	}
}

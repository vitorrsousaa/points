import type { TBaseEntity } from "@application/database/database";
import type { Prettify } from "@application/utils/types";
import type { Role, User } from "@core/domain/user";

/**
 * This entity is used to send user for dynamoDB with SK and PK.
 * PK - USER
 * SK - USER|uuid
 */
export type UserDynamoDB = Prettify<
	{
		name: string;
		email: string;
		role: Role;
		account_confirmation: boolean;
		created_at: string;
		updated_at: string;
	} & TBaseEntity &
		Omit<User, "accountConfirmation" | "updatedAt" | "createdAt">
>;

export interface IUserRepository {
	create(createInput: Omit<User, "createdAt" | "updatedAt">): Promise<User>;
	update(id: string, updateInput: Omit<User, "id">): Promise<User>;
	getByEmail(email: string): Promise<User | undefined>;
	getById(id: string): Promise<User | undefined>;
	getAll(): Promise<User[]>;
}

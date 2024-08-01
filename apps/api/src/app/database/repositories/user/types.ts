import type { TBaseEntity } from "@application/database/database";
import type { Prettify } from "@application/utils/types";
import type { TRole } from "@core/domain/role";
import type { User } from "@core/domain/user";

export type UserPersistance = {
	id: string;
	name: string;
	email: string;
	role: TRole;
	accountConfirmation: boolean;
};

/**
 * This entity is used to send user for dynamoDB with SK and PK.
 * PK - USER
 * SK - USER|uuid
 */
export type UserDynamoDB = Prettify<
	{
		name: string;
		email: string;
		role: TRole;
		accountConfirmation: boolean;
	} & TBaseEntity
>;

export interface IUserRepository {
	create(createInput: UserPersistance): Promise<User>;
	update(id: string, updateInput: Omit<UserPersistance, "id">): Promise<User>;
	getByEmail(email: string): Promise<User | undefined>;
	getById(id: string): Promise<User | undefined>;
}

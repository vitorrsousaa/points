import type { TRole } from "@core/domain/role";
import type { User } from "@core/domain/user";

export type UserPersistance = {
	id: string;
	name: string;
	email: string;
	role: TRole;
	accountConfirmation: boolean;
};

export interface IUserRepository {
	create(createInput: UserPersistance): Promise<User>;
	update(id: string, updateInput: Omit<User, "id">): Promise<User>;
	getByEmail(email: string): Promise<User | undefined>;
	getById(id: string): Promise<User | undefined>;
}

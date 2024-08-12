import type { Role } from "@core/domain/user";

export type CreateUserDTO = {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	role: Role;
};

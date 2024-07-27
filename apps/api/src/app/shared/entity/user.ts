import type { TRole } from "@core/domain/role";

export type CreateUserDTO = {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	role: TRole;
};

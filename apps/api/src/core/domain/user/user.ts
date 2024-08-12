import type { Role } from "./role";

/**
 * User domain model
 */
export type User = {
	id: string;
	email: string;
	name: string;
	role: Role;
	accountConfirmation: boolean;
};

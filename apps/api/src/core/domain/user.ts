import type { TRole } from "./role";

/**
 * User domain model
 */
export type User = {
	id: string;
	email: string;
	name: string;
	role: TRole;
	accountConfirmation: boolean;
};

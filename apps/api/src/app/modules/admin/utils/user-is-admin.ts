import type { User } from "@core/domain/user";

export function userIsAdmin(user: User): boolean {
	return user.role.includes("ADMIN");
}

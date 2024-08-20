import type { User } from "@core/domain/user";
import type { Role } from "@core/domain/user/role";

export const defaultUser: User = {
	id: "123",
	email: "email",
	accountConfirmation: false,
	name: "name",
	role: ["COACH"] as Role,
	createdAt: new Date().toISOString(),
	updatedAt: new Date().toISOString(),
};

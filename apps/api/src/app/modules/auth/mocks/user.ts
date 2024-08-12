import type { Role } from "@core/domain/user/role";

export const defaultUser = {
	id: "123",
	email: "email",
	accountConfirmation: false,
	doctorId: null,
	name: "name",
	role: ["COACH"] as Role,
};

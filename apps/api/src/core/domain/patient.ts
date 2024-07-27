import type { User } from "./user";

export type Patient = User & {
	doctorId: string;
};

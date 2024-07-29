import type { User } from "./user";

export type Athlete = User & {
	coachId: string;
	weight: number;
	height: number;
	age: number;
};

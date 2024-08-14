import type { Exercise } from "./exercise";

export type Workout = {
	name: string;
	exercises: Omit<Exercise, "id">[];
	id: string;
};

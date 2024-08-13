import type { Exercise } from "./exercise";

export type Workout = {
	name: string;
	exercises: Exercise[];
	id: string;
};

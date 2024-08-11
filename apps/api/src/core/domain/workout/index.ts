import type { Exercise } from "../exercise";

export type Workout = {
	name: string;
	id: string;
	exercises: Exercise[];
};

import type { Exercise } from "./exercise";

type Sets = {
	weight: number;
	reps: number;
};

export type Workout = {
	name: string;
	exercises: Array<Omit<Exercise, "id"> & { sets: Sets[] }>;
	visibility: boolean;
	isActive: boolean;
	id: string;
};

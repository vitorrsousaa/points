import type { Exercise } from "./exercise";

type Sets = {
	weight: number;
	reps: number;
};

export type Workout = {
	name: string;
	exercises: Array<Omit<Exercise, "id"> & { sets: Sets[] }>;
	isActive: boolean;
	id: string;
};

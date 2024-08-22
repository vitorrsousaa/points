import type { Exercise } from "./exercise";

export type Sets = {
	weight: number;
	reps: number;
};

export interface Workout {
	name: string;
	exercises: Array<Omit<Exercise, "id"> & { sets: Sets[] }>;
	isActive: boolean;
	description?: string;
	category: string;
	createdAt: string;
	updateddAt: string;
	id: string;
}

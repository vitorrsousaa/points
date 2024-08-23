import type { Exercise } from "./exercise";

export type Sets = {
	weight: number;
	reps: number;
};

export type WorkoutVolume = {
	S: { sets: number; load: number };
	B: { sets: number; load: number };
	D: { sets: number; load: number };
};

export interface Workout {
	name: string;
	exercises: Array<Omit<Exercise, "id"> & { sets: Sets[] }>;
	isActive: boolean;
	description?: string;
	category: string;
	createdAt: string;
	updatedAt: string;
	id: string;
	volume: WorkoutVolume;
}

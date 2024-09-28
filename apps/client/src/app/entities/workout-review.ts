import type { Workout } from "./workout";

export type WorkoutReview = {
	id: string;
	athleteId: string;
	coachId: string;
	createdAt: string;
	updatedAt: string;
	notes: string;
	workoutId: string;
	startTime: number;
	endTime: number;
	reviewed: boolean;
	reviewedAt: string | null;
	workoutName: string;
	athleteName: string;
	plannedVolume: Workout["volume"];
	realizedVolume: Workout["volume"];
	plannedExercises: Workout["exercises"];
	realizedExercises: Workout["exercises"];
};

import type { GetAllWorkoutReviewParams } from "@/services/workout-review/get-all";

const DATABASE_NAME = "@training";

export const QUERY_KEYS = {
	SETTINGS: [`${DATABASE_NAME}:SETTINGS`],
	ATHLETES: [`${DATABASE_NAME}:ATHLETES`],
	EXERCISES: [`${DATABASE_NAME}:EXERCISES`],
	CUSTOM_EXERCISES: [`${DATABASE_NAME}:CUSTOM_EXERCISES`],
	WORKOUTS: (athleteId: string) => [`${DATABASE_NAME}:WORKOUTS`, athleteId],
	ATHLETE_GROWTH: [`${DATABASE_NAME}:ATHLETE_GROWTH`],
	WORKOUT_REVIEW: (params: GetAllWorkoutReviewParams) => [
		`${DATABASE_NAME}:WORKOUT_REVIEW`,
		params,
	],
};

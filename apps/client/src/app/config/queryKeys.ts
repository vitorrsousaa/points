const DATABASE_NAME = "@training";

export const QUERY_KEYS = {
	ATHLETES: [`${DATABASE_NAME}:ATHLETES`],
	EXERCISES: [`${DATABASE_NAME}:EXERCISES`],
	WORKOUTS: (athleteId: string) => [`${DATABASE_NAME}:WORKOUTS`, athleteId],
};

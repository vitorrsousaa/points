const DATABASE_NAME = "@training";

export const QUERY_KEYS = {
	EXERCISES: [`${DATABASE_NAME}:EXERCISES`],
	GROWTH_ATHLETE: (period: number) => [
		`${DATABASE_NAME}:GROWTH_ATHLETE`,
		period,
	],
	GROWTH_COACH: (period: number) => [`${DATABASE_NAME}:GROWTH_COACH`, period],
};

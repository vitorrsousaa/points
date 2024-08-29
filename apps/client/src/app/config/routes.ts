export const ROUTES = {
	DASHBOARD: "/dashboard",
	SIGNIN: "/login",
	SIGNUP: "/signup",
	CONFIRMATION_ACCOUNT: "/confirmation-account",
	ATHLETES: "/atletas",
	NEW_ATHLETE: "/new-athlete",
	SETTINGS: "/settings",
	EXERCISES: "/exercises",
	ATHLETE_MORE_INFO: "/atleta/:athleteId",
	NEW_TRAINING: "/atleta/:athleteId/new-training",
	UPDATE_WORKOUT: "/atleta/:athleteId/update-training/:workoutId",
	VERIFICATION: "/verificacao",
} as const;

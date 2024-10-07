import type { WorkoutReview } from "@/entitites/workout-review";
import { httpClient } from "../httpClient";

interface AthleteOrCoach {
	athleteId: string;
	coachId?: string;
}

interface CoachOrAthlete {
	athleteId?: string;
	coachId: string;
}

export type GetAllWorkoutReviewParams = {
	limit: number;
	reviewed: boolean;
} & (AthleteOrCoach | CoachOrAthlete);

export async function getAll(params: GetAllWorkoutReviewParams) {
	const { data } = await httpClient.get<WorkoutReview[]>("/workout-review", {
		params,
	});

	return data;
}

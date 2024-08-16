import type { Workout } from "@/entitites/workout";
import { httpClient } from "../httpClient";

export interface UpdateWorkoutParams {
	workout: Workout;
	athleteId: string;
	coachId: string;
}

export async function update(params: UpdateWorkoutParams) {
	const { athleteId, coachId, workout } = params;
	const { data } = await httpClient.put<Workout>("/workout", {
		athleteId,
		coachId,
		...workout,
	});

	return data;
}

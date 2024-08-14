import { httpClient } from "../httpClient";

export interface RemoveWorkoutParams {
	athleteId: string;
	workoutId: string;
}

export async function remove(params: RemoveWorkoutParams) {
	const { athleteId, workoutId } = params;
	const url = `/workout?athleteId=${athleteId}&workoutId=${workoutId}`;
	const { data } = await httpClient.delete(url);

	return data;
}

import type { Exercise } from "@/entitites/exercise";
import { httpClient } from "../httpClient";

export interface CreateExerciseParams {
	name: string;
	equipment: string;
	primaryMuscle: string;
	secondaryMuscle: string | null;
	target: string | null;
}

export async function create(params: CreateExerciseParams) {
	const { data } = await httpClient.post<Exercise>("/exercise", params);

	return data;
}

import type { Exercise } from "@/entitites/exercise";
import { httpClient } from "../httpClient";

export interface CreateCustomExerciseParams {
	name: string;
	equipment: string;
	primaryMuscle: string;
	secondaryMuscle: string | null;
	target: "D" | "S" | "B" | null;
	coachId: string;
}

export async function create(params: CreateCustomExerciseParams) {
	const { data } = await httpClient.post<Exercise>("/custom-exercise", params);

	return data;
}

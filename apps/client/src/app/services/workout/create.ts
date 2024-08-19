import type { TTrainingFormSchema } from "@/components/TrainingForm/TrainingFormSchema";
import type { Workout } from "@/entitites/workout";
import { httpClient } from "../httpClient";

export type CreateWorkoutParams = {
	athleteId: string;
	workout: TTrainingFormSchema;
};

export async function create(params: CreateWorkoutParams) {
	const { data } = await httpClient.post<Workout>("/workout", params);

	return data;
}

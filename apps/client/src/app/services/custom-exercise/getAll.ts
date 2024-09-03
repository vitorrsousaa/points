import type { CustomExercise } from "@/entitites/exercise";
import { httpClient } from "../httpClient";

export async function getAll() {
	const { data } = await httpClient.get<CustomExercise[]>("/custom-exercise");

	return data;
}

import type { Exercise } from "@/entitites/exercise";
import { httpClient } from "../httpClient";

export async function getAll() {
	const { data } = await httpClient.get<Exercise[]>("/exercise");

	return data;
}

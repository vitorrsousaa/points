import type { Workout } from "@/entitites/workout";
import { httpClient } from "../httpClient";

export async function getAll() {
	const { data } = await httpClient.get<Workout[]>("/workout");

	return data;
}

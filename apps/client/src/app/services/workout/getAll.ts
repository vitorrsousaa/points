import type { Workout } from "@/entitites/workout";
import { httpClient } from "../httpClient";

export async function getAll(params: { athleteId: string }) {
	const { athleteId } = params;
	const { data } = await httpClient.get<Workout[]>(`/workout/${athleteId}`);

	return data;
}

import type { Athlete } from "src/app/entities/athlete";
import { httpClient } from "../httpClient";

interface GetAllParams {
	coachId: string;
}

export async function getAll({ coachId }: GetAllParams) {
	const { data } = await httpClient.get<Athlete[]>(`/athlete/${coachId}`);

	return data;
}

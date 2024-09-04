import type { Athlete } from "src/app/entities/athlete";
import { httpClient } from "../httpClient";

export interface UpdateAthleteParams {
	workoutCount: number;
	weight: number;
	age: number;
	height: number;
	email: string;
	coachId: string;
	id: string;
	isActive: boolean;
}

export async function update(params: UpdateAthleteParams) {
	const { data } = await httpClient.put<Athlete>("/athlete", params);

	return data;
}

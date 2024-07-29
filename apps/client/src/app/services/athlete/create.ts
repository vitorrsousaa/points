import { httpClient } from "../httpClient";

export interface CreateAthleteParams {
	firstName: string;
	lastName: string;
	weight: number;
	age: number;
	height: number;
	email: string;
	coachId: string;
}

export async function create(params: CreateAthleteParams) {
	const { data } = await httpClient.post("/athlete/create", params);

	return data;
}

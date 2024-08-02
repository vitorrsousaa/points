import type { Athlete } from "src/app/entities/athlete";
import { httpClient } from "../httpClient";

interface GetAllParams {
	coachId: string;
}

function mapToAthlete(data: Record<string, unknown>): Athlete {
	return {
		name: data.name as string,
		id: data.id as string,
		accountConfirmation: data.accountConfirmation as boolean,
		age: data.age as number,
		email: data.email as string,
		height: data.height as number,
		weight: data.weight as number,
	};
}

export async function getAll({ coachId }: GetAllParams) {
	const { data } = await httpClient.get<Athlete[]>(`/athlete/${coachId}`);

	return data.map(mapToAthlete);
}

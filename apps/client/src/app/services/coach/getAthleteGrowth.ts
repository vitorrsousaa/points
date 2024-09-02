import { httpClient } from "../httpClient";

export async function getAthleteGrowth() {
	const { data } = await httpClient.get<{
		growth: string;
		activeGrowth: string;
	}>("/coach/metrics/athlete-growth");

	return data;
}

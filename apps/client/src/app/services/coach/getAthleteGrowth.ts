import { httpClient } from "../httpClient";

export async function getAthleteGrowth() {
	const { data } = await httpClient.get<{ growth: string }>(
		"/coach/metrics/athlete-growth",
	);

	return data.growth;
}

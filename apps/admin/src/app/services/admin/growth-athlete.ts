import type { Growth } from "@/entitites/growth";
import { httpClient } from "../httpClient";

export async function growthAthlete(params: { period: number }) {
	const { period } = params;
	const { data } = await httpClient.get<Growth>(
		`/admin/metrics/growth-athlete?period=${period}`,
	);

	return data;
}

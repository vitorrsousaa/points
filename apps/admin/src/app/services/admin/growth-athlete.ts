import { httpClient } from "../httpClient";
import type { Growth } from "@/entitites/growth";

export async function growthAthlete(params: { period: number }) {
	const { period } = params;
	const { data } = await httpClient.get<Growth>(
		`/admin/metrics/growth-athlete?period=${period}`,
	);

	return data;
}

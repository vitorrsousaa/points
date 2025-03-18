import type { Growth } from "@/entitites/growth";
import { httpClient } from "../httpClient";

export async function growthCoach(params: { period: number }) {
	const { period } = params;
	const { data } = await httpClient.get<Growth>(
		`/admin/metrics/growth-coach?period=${period}`,
	);

	return data;
}

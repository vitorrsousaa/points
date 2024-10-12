import type { Settings } from "@/entitites/Settings";
import { httpClient } from "../httpClient";

export async function updateSettings(settings: Settings) {
	const { data } = await httpClient.put<Settings>("/settings", settings);

	return data;
}

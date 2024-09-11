import type { Settings } from "@/entitites/Settings";
import { httpClient } from "../httpClient";

export async function getSettings() {
	const { data } = await httpClient.get<Settings>("/settings");

	return data;
}

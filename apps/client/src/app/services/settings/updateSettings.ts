import { Settings } from "@/entitites/Settings";
import { httpClient } from "../httpClient";

export async function updateSettings(settings: Settings) {
	return httpClient.put<Settings>("/settings", settings);
}

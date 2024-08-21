import type { Settings } from "src/app/types";
import { httpClient } from "../httpClient";

export async function updateSettings(settings: Settings) {
	return httpClient.put<Settings>("/settings", settings);
}

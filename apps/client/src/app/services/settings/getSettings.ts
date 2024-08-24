import type { Settings } from "src/app/types";
import { httpClient } from "../httpClient";

export async function getSettings() {
	const { data } = await httpClient.get<Settings>("/settings");

	return data;
}

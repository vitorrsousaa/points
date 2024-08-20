import { SettingsRepository } from "@application/database/repositories/settings";
import { makeDatabaseClient } from "./db";

export function makeSettingsRepository() {
	return new SettingsRepository(makeDatabaseClient());
}

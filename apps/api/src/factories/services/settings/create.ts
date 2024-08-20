import { CreateSettingsService } from "@application/modules/settings/services/create";
import { makeSettingsRepository } from "@factories/repositories/settings";

export function makeCreateSettingsService() {
	return new CreateSettingsService(makeSettingsRepository());
}

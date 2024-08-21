import { UpdateService } from "@application/modules/settings/services/update";
import { makeSettingsRepository } from "@factories/repositories/settings";

export function makeUpdateSettingsService() {
	return new UpdateService(makeSettingsRepository());
}

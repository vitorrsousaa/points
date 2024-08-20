import { GetByUserService } from "@application/modules/settings/services/getByUser";
import { makeSettingsRepository } from "@factories/repositories/settings";

export function makeGetSettingsByUserService() {
	return new GetByUserService(makeSettingsRepository());
}

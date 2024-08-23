import { UpdateController } from "@application/modules/settings/controllers/update";
import { makeUpdateSettingsService } from "@factories/services/settings/update";

export function makeUpdateSettingsController() {
	return new UpdateController(makeUpdateSettingsService());
}

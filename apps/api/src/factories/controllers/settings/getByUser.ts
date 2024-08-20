import { GetByUserIdController } from "@application/modules/settings/controllers/getByUserId";
import { makeGetSettingsByUserService } from "@factories/services/settings/getByUserId";

export function makeGetSettingsByUserController() {
	return new GetByUserIdController(makeGetSettingsByUserService());
}

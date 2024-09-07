import { AccountStatusController } from "@application/modules/auth/controllers/accountStatus";
import { makeAccountStatusService } from "@factories/services/auth/accountStatus";

export function makeAccountStatusController() {
	return new AccountStatusController(makeAccountStatusService());
}

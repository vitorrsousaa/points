import { AccountConfirmationController } from "@application/modules/auth/controllers/accountConfirmation";
import { makeAccountConfirmationService } from "@factories/services/auth/accountConfirmation";

export function makeAccountConfirmationController() {
	return new AccountConfirmationController(makeAccountConfirmationService());
}

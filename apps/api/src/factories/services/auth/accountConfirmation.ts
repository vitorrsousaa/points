import { AccountConfirmationService } from "@application/modules/auth/services/accountConfirmation";
import { makeAuthProvider } from "@factories/providers/authProvider";
import { makeUserRepository } from "@factories/repositories/user";

export function makeAccountConfirmationService() {
	return new AccountConfirmationService(
		makeAuthProvider(),
		makeUserRepository(),
	);
}

import { AccountStatusService } from "@application/modules/auth/services/accountStatus";
import { makeUserRepository } from "@factories/repositories/user";

export function makeAccountStatusService() {
	return new AccountStatusService(makeUserRepository());
}

import { SigninController } from "@application/modules/auth/controllers/signin";
import { makeSigninService } from "@factories/services/auth/signin";

export function makeSigninController() {
	return new SigninController(makeSigninService());
}

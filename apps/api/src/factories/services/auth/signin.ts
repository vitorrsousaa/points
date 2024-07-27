import { SigninService } from "@application/modules/auth/services/signin";
import { makeAuthProvider } from "@factories/providers/authProvider";

export function makeSigninService() {
	return new SigninService(makeAuthProvider());
}

import { SigninService } from "@application/modules/auth/services/signin";
import { makeAuthProvider } from "@factories/providers/authProvider";
import { makeAthleteRepository } from "@factories/repositories/athlete";
import { makeUserRepository } from "@factories/repositories/user";

export function makeSigninService() {
	return new SigninService(
		makeAuthProvider(),
		makeUserRepository(),
		makeAthleteRepository(),
	);
}

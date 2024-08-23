import { SignupService } from "@application/modules/auth/services/signup/service";
import { makeAuthProvider } from "@factories/providers/authProvider";
import { makeUserRepository } from "@factories/repositories/user";
import { makeCreateSettingsService } from "../settings/create";

export function makeSignupService() {
	return new SignupService(
		makeAuthProvider(),
		makeUserRepository(),
		makeCreateSettingsService(),
	);
}

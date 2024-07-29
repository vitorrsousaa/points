import { CreateService } from "@application/modules/athlete/services/create";
import { makeAthleteRepository } from "@factories/repositories/athlete";
import { makeUserRepository } from "@factories/repositories/user";
import { makeSignupService } from "../auth/signup";

export function makeCreateAthleteService() {
	return new CreateService(
		makeSignupService(),
		makeUserRepository(),
		makeAthleteRepository(),
	);
}

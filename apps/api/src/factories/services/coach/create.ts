import { CreateService } from "@application/modules/coach/services/create";
import { makeCoachRepository } from "@factories/repositories/coach";
import { makeCreateAthleteService } from "../athlete/create";
import { makeSignupService } from "../auth/signup";

export function makeCreateCoachService() {
	return new CreateService(
		makeSignupService(),
		makeCreateAthleteService(),
		makeCoachRepository(),
	);
}

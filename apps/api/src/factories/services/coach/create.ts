import { CreateService } from "@application/modules/coach/services/create";
import { makeSignupService } from "../auth/signup";
import { makeCreateAthleteService } from "../athlete/create";
import { makeCoachRepository } from "@factories/repositories/coach";

export function makeCreateCoachService() {
	return new CreateService(
		makeSignupService(),
		makeCreateAthleteService(),
		makeCoachRepository(),
	);
}

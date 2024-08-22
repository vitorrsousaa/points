import { CreateService } from "@application/modules/coach/services/create";
import { makeSignupService } from "../auth/signup";
import { makeCreateAthleteService } from "../athlete/create";

export function makeCreateCoachService() {
	return new CreateService(makeSignupService(), makeCreateAthleteService());
}

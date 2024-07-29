import { CreateController } from "@application/modules/athlete/controllers/create";
import { makeCreateAthleteService } from "@factories/services/athlete/create";

export function makeCreateAthleteController() {
	return new CreateController(makeCreateAthleteService());
}

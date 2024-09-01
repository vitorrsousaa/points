import { UpdateController } from "@application/modules/athlete/controllers/update";
import { makeUpdateAthleteService } from "@factories/services/athlete/update";

export function makeUpdateAthleteController() {
	return new UpdateController(makeUpdateAthleteService());
}

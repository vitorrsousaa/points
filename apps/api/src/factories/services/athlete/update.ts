import { UpdateService } from "@application/modules/athlete/services/update";
import { makeAthleteRepository } from "@factories/repositories/athlete";

export function makeUpdateAthleteService() {
	return new UpdateService(makeAthleteRepository());
}

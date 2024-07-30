import { GetAllByCoachIdService } from "@application/modules/athlete/services/getAllByCoachId";
import { makeAthleteRepository } from "@factories/repositories/athlete";

export function makeGetAllByCoachIdService() {
	return new GetAllByCoachIdService(makeAthleteRepository());
}

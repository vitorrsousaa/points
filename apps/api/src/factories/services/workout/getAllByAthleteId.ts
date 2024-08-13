import { GetAllByAthleteIdService } from "@application/modules/workout/services/getAllByAthleteId";
import { makeWorkoutRepository } from "@factories/repositories/workout";

export function makeGetAllByAthleteIdService() {
	return new GetAllByAthleteIdService(makeWorkoutRepository());
}

import { GetAllByAthleteIdController } from "@application/modules/workout/controllers/getAllByAthleteId";
import { makeGetAllByAthleteIdService } from "@factories/services/workout/getAllByAthleteId";

export function makeGetAllByAthleteIdController() {
	return new GetAllByAthleteIdController(makeGetAllByAthleteIdService());
}

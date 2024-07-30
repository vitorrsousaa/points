import { GetAllByCoachIdController } from "@application/modules/athlete/controllers/getAllByCoachId";
import { makeGetAllByCoachIdService } from "@factories/services/athlete/getAllByCoachId";

export function makeGetAllByCoachIdController() {
	return new GetAllByCoachIdController(makeGetAllByCoachIdService());
}

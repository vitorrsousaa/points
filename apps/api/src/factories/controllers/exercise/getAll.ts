import { GetAllController } from "@application/modules/exercise/controllers/getAll";
import { makeGetAllExercisesService } from "@factories/services/exercise/getAll";

export function makeGetAllExercisesController() {
	return new GetAllController(makeGetAllExercisesService());
}

import { GetAllController } from "@application/modules/custom-exercise/controllers/getAll";
import { makeGetAllCustomExerciseService } from "@factories/services/custom-exercise/get-all";

export function makeGetAllCustomExerciseController() {
	return new GetAllController(makeGetAllCustomExerciseService());
}

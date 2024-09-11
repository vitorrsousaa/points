import { GetAllService } from "@application/modules/exercise/services/getAll";
import { makeExerciseRepository } from "@factories/repositories/exercise";
import { makeGetAllCustomExerciseService } from "../custom-exercise/get-all";

export function makeGetAllExercisesService() {
	return new GetAllService(
		makeExerciseRepository(),
		makeGetAllCustomExerciseService(),
	);
}

import { GetAllService } from "@application/modules/exercise/services/getAll";
import { makeExerciseRepository } from "@factories/repositories/exercise";

export function makeGetAllExercisesService() {
	return new GetAllService(makeExerciseRepository());
}

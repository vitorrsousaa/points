import { GetAllService } from "@application/modules/custom-exercise/services/getAll";
import { makeCustomExerciseRepository } from "@factories/repositories/custom-exercise";

export function makeGetAllCustomExerciseService() {
	return new GetAllService(makeCustomExerciseRepository());
}

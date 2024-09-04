import { CreateService } from "@application/modules/custom-exercise/services/create";
import { makeCustomExerciseRepository } from "@factories/repositories/custom-exercise";

export function makeCreateCustomExerciseService() {
	return new CreateService(makeCustomExerciseRepository());
}

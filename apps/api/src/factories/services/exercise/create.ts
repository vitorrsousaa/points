import { CreateService } from "@application/modules/exercise/services/create";
import { makeExerciseRepository } from "@factories/repositories/exercise";

export function makeCreateExerciseService() {
	return new CreateService(makeExerciseRepository());
}

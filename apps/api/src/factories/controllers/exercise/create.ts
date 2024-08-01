import { CreateController } from "@application/modules/exercise/controllers/create";
import { makeCreateExerciseService } from "@factories/services/exercise/create";

export function makeCreateExerciseController() {
	return new CreateController(makeCreateExerciseService());
}

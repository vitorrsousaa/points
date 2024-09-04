import { CreateController } from "@application/modules/custom-exercise/controllers/create";
import { makeCreateCustomExerciseService } from "@factories/services/custom-exercise/create";

export function makeCreateCustomExerciseController() {
	return new CreateController(makeCreateCustomExerciseService());
}

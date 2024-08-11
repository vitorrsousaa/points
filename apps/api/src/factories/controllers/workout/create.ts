import { CreateController } from "@application/modules/workout/controllers/create";
import { makeCreateWorkoutService } from "@factories/services/workout/create";

export function makeCreateWorkoutController() {
	return new CreateController(makeCreateWorkoutService());
}

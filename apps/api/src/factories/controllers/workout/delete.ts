import { DeleteController } from "@application/modules/workout/controllers/delete";
import { makeDeleteWorkoutService } from "@factories/services/workout/delete";

export function makeDeleteWorkoutController() {
	return new DeleteController(makeDeleteWorkoutService());
}

import { CreateController } from "@application/modules/workout-review/controllers/create";
import { makeCreateWorkoutReviewService } from "@factories/services/workout-review/create";

export function makeCreateWorkoutReviewController() {
	return new CreateController(makeCreateWorkoutReviewService());
}

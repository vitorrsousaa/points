import { ReviewedWorkoutReviewController } from "@application/modules/workout-review/controllers/reviewed-workout-review";
import { makeReviewedWorkoutReviewService } from "@factories/services/workout-review/reviewed";

export function makeReviewedWorkoutServiceController() {
	return new ReviewedWorkoutReviewController(
		makeReviewedWorkoutReviewService(),
	);
}

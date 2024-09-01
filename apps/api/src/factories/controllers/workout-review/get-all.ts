import { GetAllWorkoutReviewController } from "@application/modules/workout-review/controllers/getAllWorkoutReview";
import { makeGetAllWorkoutReviewService } from "@factories/services/workout-review/get-all";

export function makeGetAllWorkoutReviewController() {
	return new GetAllWorkoutReviewController(makeGetAllWorkoutReviewService());
}

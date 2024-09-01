import { GetAllWorkoutReviewService } from "@application/modules/workout-review/services/getAllWorkoutReview";
import { makeWorkoutReviewRepository } from "@factories/repositories/workout-review";

export function makeGetAllWorkoutReviewService() {
	return new GetAllWorkoutReviewService(makeWorkoutReviewRepository());
}

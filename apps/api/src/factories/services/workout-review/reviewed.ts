import { ReviewedWorkoutReviewService } from "@application/modules/workout-review/services/reviewed-workout-review";
import { makeAthleteRepository } from "@factories/repositories/athlete";
import { makeUserRepository } from "@factories/repositories/user";
import { makeWorkoutReviewRepository } from "@factories/repositories/workout-review";

export function makeReviewedWorkoutReviewService() {
	return new ReviewedWorkoutReviewService(
		makeUserRepository(),
		makeWorkoutReviewRepository(),
		makeAthleteRepository(),
	);
}

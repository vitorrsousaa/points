import { CreateService } from "@application/modules/workout-review/services/create";
import { makeAthleteRepository } from "@factories/repositories/athlete";
import { makeWorkoutReviewRepository } from "@factories/repositories/workout-review";

export function makeCreateWorkoutReviewService() {
	return new CreateService(
		makeAthleteRepository(),
		makeWorkoutReviewRepository(),
	);
}

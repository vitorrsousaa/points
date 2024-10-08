import { CreateService } from "@application/modules/workout-review/services/create";
import { makeEmailProvider } from "@factories/providers/email-provider";
import { makeAthleteRepository } from "@factories/repositories/athlete";
import { makeHistoryExerciseRepository } from "@factories/repositories/history-exercise";
import { makeUserRepository } from "@factories/repositories/user";
import { makeWorkoutRepository } from "@factories/repositories/workout";
import { makeWorkoutReviewRepository } from "@factories/repositories/workout-review";

export function makeCreateWorkoutReviewService() {
	return new CreateService(
		makeAthleteRepository(),
		makeWorkoutReviewRepository(),
		makeWorkoutRepository(),
		makeHistoryExerciseRepository(),
		makeEmailProvider(),
		makeUserRepository(),
	);
}

import { WorkoutReviewRepository } from "@application/database/repositories/workout-review";
import { makeDatabaseClient } from "./db";

export function makeWorkoutReviewRepository() {
	return new WorkoutReviewRepository(makeDatabaseClient());
}

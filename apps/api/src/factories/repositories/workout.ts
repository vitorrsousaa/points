import { WorkoutRepository } from "@application/database/repositories/workout";
import { makeDatabaseClient } from "./db";

export function makeWorkoutRepository() {
	return new WorkoutRepository(makeDatabaseClient());
}

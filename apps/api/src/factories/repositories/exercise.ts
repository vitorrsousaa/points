import { ExerciseRepository } from "@application/database/repositories/exercises";
import { makeDatabaseClient } from "./db";

export function makeExerciseRepository() {
	return new ExerciseRepository(makeDatabaseClient());
}

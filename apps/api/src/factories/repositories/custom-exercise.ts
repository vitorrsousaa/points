import { CustomExerciseRepository } from "@application/database/repositories/custom-exercises";
import { makeDatabaseClient } from "./db";

export function makeCustomExerciseRepository() {
	return new CustomExerciseRepository(makeDatabaseClient());
}

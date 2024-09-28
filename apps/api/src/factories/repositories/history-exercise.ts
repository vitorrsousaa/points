import { HistoryExerciseRepository } from "@application/database/repositories/history-exercise";
import { makeDatabaseClient } from "./db";

export function makeHistoryExerciseRepository() {
	return new HistoryExerciseRepository(makeDatabaseClient());
}

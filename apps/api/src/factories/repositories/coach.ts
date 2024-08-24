import { CoachRepository } from "@application/database/repositories/coach";
import { makeDatabaseClient } from "./db";

export function makeCoachRepository() {
	return new CoachRepository(makeDatabaseClient());
}

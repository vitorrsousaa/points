import { AthleteRepository } from "@application/database/repositories/athlete";
import { makeDatabaseClient } from "./db";

export function makeAthleteRepository() {
	return new AthleteRepository(makeDatabaseClient());
}

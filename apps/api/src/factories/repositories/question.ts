import { QuestionRepository } from "@application/database/repositories/questions";
import { makeDatabaseClient } from "./db";

export function makeQuestionRepository() {
	return new QuestionRepository(makeDatabaseClient());
}

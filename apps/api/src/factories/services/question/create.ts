import { CreateService } from "@application/modules/question/services/create";
import { makeQuestionRepository } from "@factories/repositories/question";

export function makeCreateQuestionService() {
	return new CreateService(makeQuestionRepository());
}

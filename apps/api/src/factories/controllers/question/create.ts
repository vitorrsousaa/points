import { CreateController } from "@application/modules/question/controllers/create";
import { makeCreateQuestionService } from "@factories/services/question/create";

export function makeCreateQuestionController() {
	return new CreateController(makeCreateQuestionService());
}

import { GetAllService } from "@application/modules/question/services/getAll";
import { makeQuestionRepository } from "@factories/repositories/question";

export function makeGetAllQuestionService() {
	return new GetAllService(makeQuestionRepository());
}

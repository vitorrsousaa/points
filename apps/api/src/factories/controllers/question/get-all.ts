import { GetAllController } from "@application/modules/question/controllers/getAll";
import { makeGetAllQuestionService } from "@factories/services/question/get-all";

export function makeGetAllQuestionController() {
	return new GetAllController(makeGetAllQuestionService());
}

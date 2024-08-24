import { CreateController } from "@application/modules/coach/controllers/create";
import { makeCreateCoachService } from "@factories/services/coach/create";

export function makeCreateCoachController() {
	return new CreateController(makeCreateCoachService());
}

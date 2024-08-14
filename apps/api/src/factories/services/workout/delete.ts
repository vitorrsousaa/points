import { DeleteService } from "@application/modules/workout/services/delete";
import { makeWorkoutRepository } from "@factories/repositories/workout";

export function makeDeleteWorkoutService() {
	return new DeleteService(makeWorkoutRepository());
}

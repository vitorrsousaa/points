import { UpdateController } from "@application/modules/workout/controllers/update";
import { makeServiceUpdateWorkout } from "@factories/services/workout/update";

export function makeControllerUpdateWorkout() {
	return new UpdateController(makeServiceUpdateWorkout());
}

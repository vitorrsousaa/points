import { UpdateService } from "@application/modules/workout/services/update";
import { makeWorkoutRepository } from "@factories/repositories/workout";

export function makeServiceUpdateWorkout() {
	return new UpdateService(makeWorkoutRepository());
}

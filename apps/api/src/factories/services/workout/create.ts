import { CreateService } from "@application/modules/workout/services/create";
import { makeAthleteRepository } from "@factories/repositories/athlete";
import { makeUserRepository } from "@factories/repositories/user";
import { makeWorkoutRepository } from "@factories/repositories/workout";

export function makeCreateWorkoutService() {
	return new CreateService(
		makeUserRepository(),
		makeAthleteRepository(),
		makeWorkoutRepository(),
	);
}

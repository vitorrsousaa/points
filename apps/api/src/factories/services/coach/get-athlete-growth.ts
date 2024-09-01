import { GetAthleteGrowthService } from "@application/modules/coach/services/getAthleteGrowth";
import { makeAthleteRepository } from "@factories/repositories/athlete";
import { makeCoachRepository } from "@factories/repositories/coach";

export function makeGetAthleteGrowthService() {
	return new GetAthleteGrowthService(
		makeCoachRepository(),
		makeAthleteRepository(),
	);
}

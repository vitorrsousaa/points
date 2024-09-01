import { GetAthleteGrowthController } from "@application/modules/coach/controllers/getAthleteGrowth";
import { makeGetAthleteGrowthService } from "@factories/services/coach/get-athlete-growth";

export function makeGetAthleteGrowthController() {
	return new GetAthleteGrowthController(makeGetAthleteGrowthService());
}

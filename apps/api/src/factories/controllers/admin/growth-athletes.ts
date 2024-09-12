import { GrowthAthletesController } from "@application/modules/admin/controllers/growthAthletes";
import { makeGetAllAthletesAdminService } from "@factories/services/admin/get-all-athletes";

export function makeGrowthAthletesController() {
	return new GrowthAthletesController(makeGetAllAthletesAdminService());
}

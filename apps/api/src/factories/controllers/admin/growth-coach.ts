import { GrowthCoachesController } from "@application/modules/admin/controllers/growthCoaches";
import { makeGetAllCoachesAdminService } from "@factories/services/admin/get-all-coaches";

export function makeGrowthCoachesController() {
	return new GrowthCoachesController(makeGetAllCoachesAdminService());
}

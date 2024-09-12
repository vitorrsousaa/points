import { GetAllCoachesService } from "@application/modules/admin/services/getAllCoaches";
import { makeUserRepository } from "@factories/repositories/user";

export function makeGetAllCoachesAdminService() {
	return new GetAllCoachesService(makeUserRepository());
}

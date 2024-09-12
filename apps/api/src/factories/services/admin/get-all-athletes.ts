import { GetAllAthletesService } from "@application/modules/admin/services/getAllAthletes";
import { makeUserRepository } from "@factories/repositories/user";

export function makeGetAllAthletesAdminService() {
	return new GetAllAthletesService(makeUserRepository());
}

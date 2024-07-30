import type { Athlete } from "@core/domain/athlete";
import type { TRole } from "@core/domain/role";

// export type PatientPersistance = {
// 	id: string;
// 	doctorId: string;
// 	name: string;
// 	email: string;
// 	role: TRole;
// 	accountConfirmation: boolean;
// };

export interface IAthleteRepository {
	update(athlete: Athlete): Promise<Athlete>;
	getAllByCoachId(coachId: string): Promise<Athlete[]>;
}

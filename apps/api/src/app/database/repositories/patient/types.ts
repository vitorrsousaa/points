import type { Patient } from "@core/domain/patient";
import type { TRole } from "@core/domain/role";

export type PatientPersistance = {
	id: string;
	doctorId: string;
	name: string;
	email: string;
	role: TRole;
	accountConfirmation: boolean;
};

export interface IPatientRepository {
	getAll(doctorId: string): Promise<Patient[]>;
}

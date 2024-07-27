import type { Doctor } from "@core/domain/doctor";
import type { TRole } from "@core/domain/role";

export type DoctorPersistance = {
	id: string;
	name: string;
	email: string;
	role: TRole;
	accountConfirmation: boolean;
};

export interface IDoctorRepository {
	getAll(): Promise<Doctor[]>;
}

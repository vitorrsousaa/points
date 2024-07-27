import { DATABASE_TABLE } from "@application/config/tables";
import type { IDatabaseClient } from "@application/database/database";
import type { Patient } from "@core/domain/patient";
import type { IPatientRepository, PatientPersistance } from "./types";

export class PatientRepository implements IPatientRepository {
	private TABLE_NAME = DATABASE_TABLE.USERS;
	constructor(private readonly dbInstance: IDatabaseClient) {}

	async getAll(doctorId: string) {
		const items = await this.dbInstance.query<PatientPersistance[]>(
			this.TABLE_NAME,
			{
				IndexName: "DoctorIdIndex",
				KeyConditionExpression: "doctorId = :doctorId",
				ExpressionAttributeValues: {
					":doctorId": doctorId,
				},
			},
		);

		return items?.map(this.mapToDomain) || [];
	}

	private mapToDomain(patient: PatientPersistance): Patient {
		return {
			id: patient.id,
			doctorId: patient.doctorId,
			name: patient.name,
			email: patient.email,
			role: patient.role,
			accountConfirmation: patient.accountConfirmation,
		};
	}
}

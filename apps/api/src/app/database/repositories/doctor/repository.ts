import { DATABASE_TABLE } from "@application/config/tables";
import type { IDatabaseClient } from "@application/database/database";
import type { Doctor } from "@core/domain/doctor";
import type { DoctorPersistance, IDoctorRepository } from "./types";

export class DoctorRepository implements IDoctorRepository {
	private TABLE_NAME = DATABASE_TABLE.USERS;
	constructor(private readonly dbInstance: IDatabaseClient) {}

	async getAll() {
		const items = await this.dbInstance.scan<DoctorPersistance[]>(
			this.TABLE_NAME,
			{
				FilterExpression: "contains(#r, :role)",
				ExpressionAttributeNames: {
					"#r": "role",
				},
				ExpressionAttributeValues: {
					":role": "DOCTOR",
				},
			},
		);

		return items?.map(this.mapToDomain) || [];
	}

	private mapToDomain(Doctor: DoctorPersistance): Doctor {
		return {
			id: Doctor.id,
			name: Doctor.name,
			email: Doctor.email,
			role: Doctor.role,
			accountConfirmation: Doctor.accountConfirmation,
		};
	}
}

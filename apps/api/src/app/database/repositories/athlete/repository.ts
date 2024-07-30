import { DATABASE_TABLE } from "@application/config/tables";
import type { IDatabaseClient } from "@application/database/database";
import type { Athlete } from "@core/domain/athlete";
import type { IAthleteRepository } from "./types";

export class AthleteRepository implements IAthleteRepository {
	private TABLE_NAME = DATABASE_TABLE.USERS;
	constructor(private readonly dbInstance: IDatabaseClient) {}

	async update(athlete: Athlete): Promise<Athlete> {
		await this.dbInstance.update(this.TABLE_NAME, {
			Key: { id: athlete.id },
			UpdateExpression:
				"set #coachId = :coachId, #weight = :weight, #height = :height, #age = :age",
			ExpressionAttributeNames: {
				"#coachId": "coachId",
				"#weight": "weight",
				"#height": "height",
				"#age": "age",
			},
			ExpressionAttributeValues: {
				":coachId": athlete.coachId,
				":weight": athlete.weight,
				":height": athlete.height,
				":age": athlete.age,
			},
		});

		return athlete;
	}

	async getAllByCoachId(coachId: string): Promise<Athlete[]> {
		const athletes = await this.dbInstance.query<Athlete[]>(this.TABLE_NAME, {
			IndexName: "CoachIdIndex",
			KeyConditionExpression: "coachId = :coachId",
			ExpressionAttributeValues: {
				":coachId": coachId,
			},
		});

		return athletes || [];
	}

	// private mapToDomain(Athlete: AthletePersistance): Athlete {
	// 	return {
	// 		id: Athlete.id,
	// 		doctorId: Athlete.doctorId,
	// 		name: Athlete.name,
	// 		email: Athlete.email,
	// 		role: Athlete.role,
	// 		accountConfirmation: Athlete.accountConfirmation,
	// 	};
	// }
}

import { DATABASE_TABLE } from "@application/config/tables";
import type { IDatabaseClient } from "@application/database/database";
import type { Athlete } from "@core/domain/athlete";
import type { IAthleteRepository } from "./types";

export class AthleteRepository implements IAthleteRepository {
	private TABLE_NAME = DATABASE_TABLE.USERS;
	private DEFAULT_USER_ID = "USER";

	constructor(private readonly dbInstance: IDatabaseClient) {}

	async update(athlete: Athlete): Promise<Athlete> {
		const { PK, SK } = this.getKeys(athlete.id);

		await this.dbInstance.update(this.TABLE_NAME, {
			Key: { PK, SK },
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

	private getKeys(id: string): { PK: string; SK: string } {
		return {
			PK: this.DEFAULT_USER_ID,
			SK: this.setUserId(id),
		};
	}

	private setUserId(id: string): string {
		return `${this.DEFAULT_USER_ID}|${id}`;
	}
}

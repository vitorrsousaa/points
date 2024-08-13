import { DATABASE_TABLE } from "@application/config/tables";
import type { IDatabaseClient } from "@application/database/database";
import type { Athlete } from "@core/domain/athlete";
import type { AthleteDynamoDB, IAthleteRepository } from "./types";

export class AthleteRepository implements IAthleteRepository {
	private TABLE_NAME = DATABASE_TABLE.TABLE_NAME;
	private DEFAULT_USER_ID = "USER";

	constructor(private readonly dbInstance: IDatabaseClient) {}

	async update(athlete: Athlete): Promise<Athlete> {
		const { PK, SK } = this.getKeys(athlete.id);

		await this.dbInstance.update(this.TABLE_NAME, {
			Key: { PK, SK },
			UpdateExpression:
				"set #coach_id = :coach_id, #weight = :weight, #height = :height, #age = :age",
			ExpressionAttributeNames: {
				"#coach_id": "coach_id",
				"#weight": "weight",
				"#height": "height",
				"#age": "age",
			},
			ExpressionAttributeValues: {
				":coach_id": athlete.coachId,
				":weight": athlete.weight,
				":height": athlete.height,
				":age": athlete.age,
			},
		});

		return athlete;
	}

	async getAllByCoachId(coachId: string): Promise<Athlete[]> {
		const athletes = await this.dbInstance.query<AthleteDynamoDB[]>(
			this.TABLE_NAME,
			{
				IndexName: "CoachIndex",
				KeyConditionExpression: "coach_id = :coach_id",
				FilterExpression: "PK = :PK",
				ExpressionAttributeValues: {
					":coach_id": coachId,
					":PK": this.DEFAULT_USER_ID,
				},
			},
		);

		return athletes ? athletes.map(this.mapToDomain) : [];
	}

	async getById(id: string): Promise<Athlete | null> {
		const { PK, SK } = this.getKeys(id);

		const athlete = await this.dbInstance.get<AthleteDynamoDB>(
			this.TABLE_NAME,
			{
				Key: { PK, SK },
			},
		);

		return athlete ? this.mapToDomain(athlete) : null;
	}

	private getKeys(id: string): { PK: string; SK: string } {
		return {
			PK: this.DEFAULT_USER_ID,
			SK: this.setUserId(id),
		};
	}

	private setUserId(id: string): string {
		return `${this.DEFAULT_USER_ID}|${id}`;
	}

	private getUserId(userId: string): string {
		return userId.split("|")[1];
	}

	private mapToDomain(athlete: AthleteDynamoDB): Athlete {
		return {
			id: athlete.SK.split("|")[1],
			name: athlete.name,
			email: athlete.email,
			role: athlete.role,
			accountConfirmation: athlete.account_confirmation,
			age: athlete.age,
			coachId: athlete.coach_id,
			height: athlete.height,
			weight: athlete.weight,
		};
	}
}

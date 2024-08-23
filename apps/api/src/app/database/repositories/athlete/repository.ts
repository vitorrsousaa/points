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
		const now = new Date().toISOString();

		await this.dbInstance.update(this.TABLE_NAME, {
			Key: { PK, SK },
			UpdateExpression:
				"set #coach_id = :coach_id, #weight = :weight, #height = :height, #age = :age, #updated_at = :updated_at",
			ExpressionAttributeNames: {
				"#coach_id": "coach_id",
				"#weight": "weight",
				"#height": "height",
				"#age": "age",
				"#updated_at": "updated_at",
			},
			ExpressionAttributeValues: {
				":coach_id": athlete.coachId,
				":weight": athlete.weight,
				":height": athlete.height,
				":age": athlete.age,
				":updated_at": now,
			},
		});

		const updatedAthlete: AthleteDynamoDB = {
			...athlete,
			updated_at: now,
			created_at: athlete.createdAt,
			account_confirmation: athlete.accountConfirmation,
			coach_id: athlete.coachId,
			PK,
			SK,
		};

		return this.mapToDomain(updatedAthlete);
	}

	async getAllByCoachId(coachId: string): Promise<Athlete[]> {
		const athletes = await this.dbInstance.query<AthleteDynamoDB[]>(
			this.TABLE_NAME,
			{
				IndexName: "CoachIndex",
				KeyConditionExpression: "coach_id = :coach_id",
				FilterExpression: "SK = :SK",
				ExpressionAttributeValues: {
					":coach_id": coachId,
					":SK": "PROFILE",
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
			SK: "PROFILE",
			PK: this.setUserId(id),
		};
	}

	private setUserId(id: string): string {
		return `${this.DEFAULT_USER_ID}|${id}`;
	}

	private mapToDomain(athlete: AthleteDynamoDB): Athlete {
		return {
			id: athlete.id,
			name: athlete.name,
			email: athlete.email,
			role: athlete.role,
			accountConfirmation: athlete.account_confirmation,
			age: athlete.age,
			coachId: athlete.coach_id,
			height: athlete.height,
			weight: athlete.weight,
			createdAt: athlete.created_at,
			updatedAt: athlete.updated_at,
		};
	}
}

import { DATABASE_TABLE } from "@application/config/tables";
import type { IDatabaseClient } from "@application/database/database";
import type { Athlete } from "@core/domain/athlete";
import type { AthleteDynamoDB, IAthleteRepository } from "./types";

export class AthleteRepository implements IAthleteRepository {
	private TABLE_NAME = DATABASE_TABLE.TABLE_NAME;

	constructor(private readonly dbInstance: IDatabaseClient) {}
	async create(
		athlete: Omit<Athlete, "createdAt" | "updatedAt">,
	): Promise<Athlete> {
		const { PK, SK } = this.getKeys(athlete.coachId, athlete.id);
		const { gsi1pk, gsi1sk } = this.getGSIKeys(athlete.id, athlete.coachId);

		const now = new Date().toISOString();

		const newAthlete: AthleteDynamoDB = {
			PK,
			SK,
			gsi1pk,
			gsi1sk,
			age: athlete.age,
			coach_id: athlete.coachId,
			created_at: now,
			updated_at: now,
			height: athlete.height,
			id: athlete.id,
			name: athlete.name,
			weight: athlete.weight,
		};

		await this.dbInstance.create(this.TABLE_NAME, { ...newAthlete });

		return this.mapToDomain(newAthlete);
	}

	async update(athlete: Athlete): Promise<Athlete> {
		const { PK, SK } = this.getKeys(athlete.coachId, athlete.id);
		const now = new Date().toISOString();

		await this.dbInstance.update(this.TABLE_NAME, {
			Key: { PK, SK },
			UpdateExpression:
				"set  #weight = :weight, #height = :height, #age = :age, #updated_at = :updated_at",
			ExpressionAttributeNames: {
				"#weight": "weight",
				"#height": "height",
				"#age": "age",
				"#updated_at": "updated_at",
			},
			ExpressionAttributeValues: {
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
			coach_id: athlete.coachId,
			PK,
			SK,
			gsi1pk: "",
			gsi1sk: "",
		};

		return this.mapToDomain(updatedAthlete);
	}

	async getAllByCoachId(coachId: string): Promise<Athlete[]> {
		const { PK, SK } = this.getKeys(coachId, "athleteId");

		const athletes = await this.dbInstance.query<AthleteDynamoDB[]>(
			this.TABLE_NAME,
			{
				KeyConditionExpression: "PK = :PK and begins_with(SK, :SK)",
				ExpressionAttributeValues: {
					":PK": PK,
					":SK": "ATHLETE|",
				},
			},
		);

		return athletes ? athletes.map(this.mapToDomain) : [];
	}

	async getById(athleteId: string): Promise<Athlete | null> {
		const { gsi1pk } = this.getGSIKeys(athleteId, "coachId");

		const athlete = await this.dbInstance.query<AthleteDynamoDB>(
			this.TABLE_NAME,
			{
				IndexName: "GSI1Index",
				KeyConditionExpression: "gsi1pk = :gsi1pk",
				ExpressionAttributeValues: {
					":gsi1pk": gsi1pk,
				},
			},
		);

		return athlete ? this.mapToDomain(athlete) : null;
	}

	private getGSIKeys(
		athleteId: string,
		coachId: string,
	): { gsi1pk: string; gsi1sk: string } {
		return {
			gsi1pk: `ATHLETE|${athleteId}`,
			gsi1sk: `COACH|${coachId}`,
		};
	}

	private getKeys(
		coachId: string,
		athleteId: string,
	): { PK: string; SK: string } {
		return {
			SK: `ATHLETE|${athleteId}`,
			PK: `USER|COACH|${coachId}`,
		};
	}

	private mapToDomain(athlete: AthleteDynamoDB): Athlete {
		return {
			id: athlete.id,
			name: athlete.name,
			age: athlete.age,
			coachId: athlete.coach_id,
			height: athlete.height,
			weight: athlete.weight,
			createdAt: athlete.created_at,
			updatedAt: athlete.updated_at,
		};
	}
}

import type { IDatabaseClient } from "@application/database/database";
import type { Athlete } from "@core/domain/athlete";
import type { AthleteDynamoDB, IAthleteRepository } from "./types";

export class AthleteRepository implements IAthleteRepository {
	constructor(private readonly dbInstance: IDatabaseClient) {}
	async create(
		athlete: Omit<Athlete, "createdAt" | "updatedAt">,
	): Promise<Athlete> {
		const { PK, SK } = this.getKeys(athlete.coachId, athlete.id);
		const { gsi1pk, gsi1sk } = this.getGSIKeys(athlete.id, athlete.coachId);

		const now = new Date().toISOString();
		const DEFAULT_WORKOUT_COUNT = 0;

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
			email: athlete.email,
			workout_count: DEFAULT_WORKOUT_COUNT,
			is_active: athlete.isActive,
		};

		await this.dbInstance.create({ ...newAthlete });

		return this.mapToDomain(newAthlete);
	}

	async update(athlete: Athlete): Promise<Athlete> {
		const { PK, SK } = this.getKeys(athlete.coachId, athlete.id);
		const now = new Date().toISOString();

		await this.dbInstance.update({
			Key: { PK, SK },
			UpdateExpression:
				"set  #weight = :weight, #height = :height, #age = :age, #updated_at = :updated_at, #workout_count = :workout_count, #is_active = :is_active",
			ExpressionAttributeNames: {
				"#weight": "weight",
				"#height": "height",
				"#age": "age",
				"#updated_at": "updated_at",
				"#workout_count": "workout_count",
				"#is_active": "is_active",
			},
			ExpressionAttributeValues: {
				":weight": athlete.weight,
				":height": athlete.height,
				":age": athlete.age,
				":workout_count": athlete.workoutCount,
				":updated_at": now,
				":is_active": athlete.isActive,
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
			workout_count: athlete.workoutCount,
			is_active: athlete.isActive,
		};

		return this.mapToDomain(updatedAthlete);
	}

	async getAllByCoachId(coachId: string): Promise<Athlete[]> {
		const { PK, SK } = this.getKeys(coachId, "athleteId");

		const athletes = await this.dbInstance.query<AthleteDynamoDB[]>({
			KeyConditionExpression: "PK = :PK and begins_with(SK, :SK)",
			ExpressionAttributeValues: {
				":PK": PK,
				":SK": "ATHLETE|",
			},
		});

		return athletes ? athletes.map(this.mapToDomain) : [];
	}

	async getById(athleteId: string): Promise<Athlete | null> {
		const { gsi1pk } = this.getGSIKeys(athleteId, "coachId");

		const athlete = await this.dbInstance.query<AthleteDynamoDB[]>({
			IndexName: "GSI1Index",
			KeyConditionExpression: "gsi1pk = :gsi1pk",
			ExpressionAttributeValues: {
				":gsi1pk": gsi1pk,
			},
		});
		return athlete && athlete?.length > 0 ? this.mapToDomain(athlete[0]) : null;
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
			email: athlete.email,
			workoutCount: athlete.workout_count,
			isActive: athlete.is_active || false,
		};
	}
}

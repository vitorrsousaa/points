import { DATABASE_TABLE } from "@application/config/tables";
import type { IDatabaseClient } from "@application/database/database";
import type { Coach } from "@core/domain/coach";
import type { CoachDynamoDB, ICoachRepository } from "./types";

export class CoachRepository implements ICoachRepository {
	private TABLE_NAME = DATABASE_TABLE.TABLE_NAME;

	constructor(private readonly dbInstance: IDatabaseClient) {}

	async create(coach: Omit<Coach, "createdAt" | "updatedAt">): Promise<Coach> {
		const { PK, SK } = this.getKeys(coach.id);

		const now = new Date().toISOString();

		const newCoach: CoachDynamoDB = {
			PK,
			SK,
			created_at: now,
			updated_at: now,
			id: coach.id,
			name: coach.name,
		};

		await this.dbInstance.create(this.TABLE_NAME, { ...newCoach });

		return this.mapToDomain(newCoach);
	}

	async getById(coachId: string): Promise<Coach | null> {
		const { PK, SK } = this.getKeys(coachId);

		const coach = await this.dbInstance.get<CoachDynamoDB>(this.TABLE_NAME, {
			Key: { PK, SK },
		});

		return coach ? this.mapToDomain(coach) : null;
	}

	private getKeys(coachId: string): { PK: string; SK: string } {
		return {
			SK: "COACH|PROFILE",
			PK: `USER|COACH|${coachId}`,
		};
	}

	private mapToDomain(coach: CoachDynamoDB): Coach {
		return {
			id: coach.id,
			name: coach.name,
			createdAt: coach.created_at,
			updatedAt: coach.updated_at,
		};
	}
}

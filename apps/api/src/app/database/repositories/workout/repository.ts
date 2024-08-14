import { randomUUID } from "node:crypto";
import { DATABASE_TABLE } from "@application/config/tables";
import type {
	IDatabaseClient,
	TBaseEntity,
} from "@application/database/database";
import type { Workout } from "@core/domain/workout";
import type { IWorkoutRepository, WorkoutDynamoDB } from "./types";

export class WorkoutRepository implements IWorkoutRepository {
	private TABLE_NAME = DATABASE_TABLE.TABLE_NAME;

	constructor(private readonly dbInstance: IDatabaseClient) {}
	async create(
		workout: Omit<Workout, "createdAt" | "updatedAt">,
	): Promise<Workout> {
		const { athleteId, coachId, name, exercises } = workout;
		const { PK, SK } = this.getKeys(athleteId);
		const workoutId = randomUUID();
		const now = new Date().toISOString();

		const newWorkout: WorkoutDynamoDB = {
			PK,
			SK,
			athlete_id: athleteId,
			coach_id: coachId,
			created_at: now,
			updated_at: now,
			id: workoutId,
			name,
			exercises,
		};

		await this.dbInstance.create(this.TABLE_NAME, { ...newWorkout });

		return {
			exercises,
			name,
			id: workoutId,
			athleteId,
			coachId,
			createdAt: now,
			updatedAt: now,
		};
	}
	update(workout: Workout): Promise<Workout> {
		throw new Error("Method not implemented.");
	}
	async getAllByAthleteId(athleteId: string): Promise<Workout[]> {
		const { PK } = this.getKeys(athleteId);

		const result = await this.dbInstance.query<WorkoutDynamoDB[]>(
			this.TABLE_NAME,
			{
				KeyConditionExpression: "PK = :PK",
				ExpressionAttributeValues: {
					":PK": PK,
				},
			},
		);

		return result ? result.map(this.mapToDomain) : [];
	}
	async getById(athleteId: string, workoutId: string): Promise<Workout | null> {
		const { PK } = this.getKeys(athleteId);
		const result = await this.dbInstance.query<WorkoutDynamoDB>(
			this.TABLE_NAME,
			{
				KeyConditionExpression: "PK = :PK",
				FilterExpression: "id = :id",
				ExpressionAttributeValues: {
					":PK": PK,
					":id": workoutId,
				},
			},
		);

		return result ? this.mapToDomain(result) : null;
	}
	async delete(athleteId: string, workoutId: string): Promise<void> {
		const { PK } = this.getKeys(athleteId);
		await this.dbInstance.delete(this.TABLE_NAME, {
			Key: {
				PK: PK,
			},
			ConditionExpression: "id = :id",
			ExpressionAttributeValues: {
				":id": workoutId,
			},
		});
	}

	private getKeys(athleteId: string): TBaseEntity {
		const now = new Date().toISOString();
		return {
			PK: `WORKOUT|ATHLETE|${athleteId}`,
			SK: `WORKOUT|${now}`,
		};
	}

	private mapToDomain(workout: WorkoutDynamoDB): Workout {
		return {
			athleteId: workout.athlete_id,
			coachId: workout.coach_id,
			createdAt: workout.created_at,
			updatedAt: workout.updated_at,
			exercises: workout.exercises,
			id: workout.id,
			name: workout.name,
		};
	}
}

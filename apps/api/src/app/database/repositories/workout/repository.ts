import { randomUUID } from "node:crypto";
import { DATABASE_TABLE } from "@application/config/tables";
import type {
	IDatabaseClient,
	TBaseEntity,
} from "@application/database/database";
import { defaultVolume } from "@application/modules/workout/functions/get-workout-volume";
import type { Workout, WorkoutVolume } from "@core/domain/workout";
import type { IWorkoutRepository, WorkoutDynamoDB } from "./types";

export class WorkoutRepository implements IWorkoutRepository {
	private TABLE_NAME = DATABASE_TABLE.TABLE_NAME;

	constructor(private readonly dbInstance: IDatabaseClient) {}
	async create(
		workout: Omit<Workout, "createdAt" | "updatedAt"> & {
			volume?: WorkoutVolume;
		},
	): Promise<Workout> {
		const {
			athleteId,
			coachId,
			name,
			exercises,
			description,
			isActive,
			volume,
		} = workout;
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
			description,
			is_active: isActive,
			volume,
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
			description,
			isActive,
			volume,
		};
	}
	async update(workout: Workout): Promise<Workout> {
		const { PK } = this.getKeys(workout.athleteId);
		const SK = `WORKOUT|${workout.createdAt}`;
		const now = new Date().toISOString();

		await this.dbInstance.update(this.TABLE_NAME, {
			Key: { PK, SK },
			UpdateExpression:
				"set #name = :name, #exercises = :exercises, #updated_at = :updated_at, #is_active = :is_active, #description = :description, #volume = :volume",
			ExpressionAttributeNames: {
				"#name": "name",
				"#exercises": "exercises",
				"#updated_at": "updated_at",
				"#is_active": "is_active",
				"#description": "description",
				"#volume": "volume",
			},
			ExpressionAttributeValues: {
				":name": workout.name,
				":exercises": workout.exercises,
				":updated_at": now,
				":is_active": workout.isActive,
				":description": workout.description,
				":volume": workout.volume,
			},
		});

		return { ...workout, updatedAt: now };
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
		const result = await this.dbInstance.query<WorkoutDynamoDB[]>(
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

		return result ? this.mapToDomain(result[0]) : null;
	}
	async delete(athleteId: string, createdAt: string): Promise<void> {
		const { PK } = this.getKeys(athleteId);
		const SK = `WORKOUT|${createdAt}`;
		await this.dbInstance.delete(this.TABLE_NAME, {
			Key: {
				PK: PK,
				SK: SK,
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
			isActive: workout.is_active,
			description: workout.description,
			volume: workout.volume || defaultVolume,
		};
	}
}

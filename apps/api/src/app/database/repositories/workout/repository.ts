import { randomUUID } from "node:crypto";
import type {
	IDatabaseClient,
	TBaseEntity,
	TBaseIndexes,
} from "@application/database/database";
import { defaultVolume } from "@application/modules/workout/functions/get-workout-volume";
import type { Workout, WorkoutVolume } from "@core/domain/workout";
import type { IWorkoutRepository, WorkoutDynamoDB } from "./types";

export class WorkoutRepository implements IWorkoutRepository {
	constructor(private readonly dbInstance: IDatabaseClient) {}
	async getAllActiveByAthleteId(athleteId: string): Promise<Workout[]> {
		const { gsi1pk, gsi1sk } = this.getGSIKeys(true, athleteId);

		const result = await this.dbInstance.query<WorkoutDynamoDB[]>({
			KeyConditionExpression:
				"gsi1pk = :gsi1pk and begins_with(gsi1sk, :gsi1sk)",
			IndexName: "GSI1Index",
			ExpressionAttributeValues: {
				":gsi1pk": gsi1pk,
				":gsi1sk": gsi1sk,
			},
		});

		return result ? result.map(this.mapToDomain) : [];
	}

	async create(
		workout: Omit<Workout, "createdAt" | "updatedAt" | "id"> & {
			volume?: WorkoutVolume;
			createdAt?: string;
			updatedAt?: string;
			id?: string;
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
			createdAt,
			id,
			updatedAt,
		} = workout;
		const workoutId = id || randomUUID();
		const { PK, SK } = this.getKeys(athleteId, workoutId);
		const now = new Date().toISOString();

		const { gsi1pk, gsi1sk } = this.getGSIKeys(isActive, athleteId, workoutId);

		const newWorkout: WorkoutDynamoDB = {
			PK,
			SK,
			athlete_id: athleteId,
			coach_id: coachId,
			created_at: createdAt || now,
			updated_at: updatedAt || now,
			id: workoutId,
			name,
			exercises,
			description,
			is_active: isActive,
			volume,
			gsi1pk,
			gsi1sk,
		};

		await this.dbInstance.create({ ...newWorkout });

		return this.mapToDomain(newWorkout);
	}

	async update(workout: Workout): Promise<Workout> {
		await this.delete(workout.athleteId, workout.id, workout.createdAt);

		const result = await this.create({
			...workout,
			updatedAt: new Date().toISOString(),
		});

		// const newWorkout: WorkoutDynamoDB = {
		// 	PK:newPK,
		// 	SK:newSK,
		// 	athlete_id: workout.athleteId,
		// 	coach_id: workout.coachId,
		// 	created_at: workout.createdAt,
		// 	updated_at: now,
		// 	id: workout.id,
		// 	name: workout.name,
		// 	exercises: workout.exercises,
		// 	description: workout.description,
		// 	is_active: workout.isActive,
		// 	volume: workout.volume,
		// 	gsi1pk,
		// 	gsi1sk,
		// };

		// await this.dbInstance.transactWrite({
		// 	TransactItems: [
		// 		{
		// 			ConditionCheck: {
		// 				TableName: DATABASE_TABLE.TABLE_NAME,
		// 				Key: {
		// 					PK: PK,
		// 					SK: SK,
		// 				},
		// 				ConditionExpression: "attribute_exists(PK) and attribute_exists(SK)"
		// 			}
		// 		},
		// 		{
		// 			Delete:{
		// 				Key: {
		// 					PK: PK,
		// 					SK: SK,
		// 				},
		// 				TableName: DATABASE_TABLE.TABLE_NAME
		// 			},

		// 		},
		// 		{
		// 			Put:{
		// 				TableName: DATABASE_TABLE.TABLE_NAME,
		// 				Item:newWorkout
		// 			}
		// 		}
		// 	]
		// })

		return result;
	}

	async getAllByAthleteId(athleteId: string): Promise<Workout[]> {
		const { PK } = this.getKeys(athleteId);

		const result = await this.dbInstance.query<WorkoutDynamoDB[]>({
			KeyConditionExpression: "PK = :PK",
			ExpressionAttributeValues: {
				":PK": PK,
			},
		});

		return result ? result.map(this.mapToDomain) : [];
	}

	async getById(athleteId: string, workoutId: string): Promise<Workout | null> {
		const { PK } = this.getKeys(athleteId);
		const SK = this.getSK(workoutId);
		const result = await this.dbInstance.query<WorkoutDynamoDB[]>({
			KeyConditionExpression: "PK = :PK and begins_with(SK, :SK)",
			ExpressionAttributeValues: {
				":PK": PK,
				":SK": SK,
			},
		});

		return result && result.length > 0 ? this.mapToDomain(result[0]) : null;
	}

	async delete(
		athleteId: string,
		workoutId: string,
		createdAt: string,
	): Promise<void> {
		const { PK } = this.getKeys(athleteId);
		const SK = this.getSK(workoutId, createdAt);
		await this.dbInstance.delete({
			Key: {
				PK: PK,
				SK: SK,
			},
		});
	}

	private getGSIKeys(
		isActive: boolean,
		athleteId: string,
		workoutId?: string,
	): TBaseIndexes {
		const status = isActive ? "ACTIVE" : "INACTIVE";

		return {
			gsi1pk: `WORKOUT|ATHLETE|${athleteId}`,
			gsi1sk: workoutId
				? `STATUS#${status}|WORKOUT#${workoutId}`
				: `STATUS#${status}`,
		};
	}

	private getSK(workoutId: string, createdAt?: string) {
		return createdAt
			? `WORKOUT|${workoutId}|${createdAt}`
			: `WORKOUT|${workoutId}`;
	}

	private getKeys(athleteId: string, workoutId?: string): TBaseEntity {
		const now = new Date().toISOString();
		return {
			PK: `WORKOUT|ATHLETE|${athleteId}`,
			SK: workoutId ? `WORKOUT|${workoutId}|${now}` : `WORKOUT|${now}`,
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

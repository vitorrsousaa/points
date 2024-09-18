import { randomUUID } from "node:crypto";
import type {
	IDatabaseClient,
	TBaseEntity,
	TBaseIndexes,
} from "@application/database/database";
import type { WorkoutReview } from "@core/domain/workout-review";
import type { IWorkoutReviewRepository, WorkoutReviewDynamoDB } from "./types";

export class WorkoutReviewRepository implements IWorkoutReviewRepository {
	constructor(private readonly dbInstance: IDatabaseClient) {}
	async getAllWorkoutReviewByAthleteId(
		athleteId: string,
		limit: number,
		status?: boolean,
	): Promise<WorkoutReview[]> {
		const hasSK = Boolean(status);
		const { PK } = this.getKeys(athleteId, "", hasSK);
		const skStatus = this.getSkStatus(status);

		const SK = `WORKOUTREVIEW|STATUS|${skStatus}`;

		const workouts = await this.dbInstance.query<WorkoutReviewDynamoDB[]>({
			KeyConditionExpression: "PK = :PK and begins_with(SK, :SK)",
			ExpressionAttributeValues: {
				":PK": PK,
				":SK": SK,
			},
			Limit: limit,
		});

		return workouts ? workouts.map(this.mapToDomain) : [];
	}
	async getAllPendingWorkoutReviewByWorkoutIdAndAthleteId(
		workoutId: string,
		athleteId: string,
	): Promise<WorkoutReview[]> {
		const { PK } = this.getKeys(athleteId, workoutId, false);
		const skStatus = this.getSkStatus(false);

		const SK = `WORKOUTREVIEW|STATUS|${skStatus}`;

		const workouts = await this.dbInstance.query<WorkoutReviewDynamoDB[]>({
			KeyConditionExpression: "PK = :PK and begins_with(SK, :SK)",
			ExpressionAttributeValues: {
				":PK": PK,
				":SK": SK,
			},
		});

		return workouts ? workouts.map(this.mapToDomain) : [];
	}
	async getAllPendingWorkoutReviewByWorkoutIdAndCoachId(
		workoutId: string,
		coachId: string,
	): Promise<WorkoutReview[]> {
		const { gsi1pk, gsi1sk } = this.getIndexes(false, coachId, workoutId);

		const result = await this.dbInstance.query<WorkoutReviewDynamoDB[]>({
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
	async getAllWorkoutReviewByCoachId(
		coachId: string,
		status?: boolean,
	): Promise<WorkoutReview[]> {
		const { gsi1pk } = this.getIndexes(false, coachId, "workoutId");

		const skStatus = this.getSkStatus(status);

		const gsi1sk = `WORKOUTREVIEW|STATUS|${skStatus}`;

		const result = await this.dbInstance.query<WorkoutReviewDynamoDB[]>({
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
		workout: Omit<WorkoutReview, "createdAt" | "updatedAt" | "id">,
	): Promise<WorkoutReview> {
		const {
			athleteId,
			coachId,
			notes,
			workoutId,
			plannedExercises,
			realizedExercises,
			plannedVolume,
			realizedVolume,
			endTime,
			startTime,
			reviewed,
		} = workout;
		const { PK, SK } = this.getKeys(athleteId, workoutId, reviewed);
		const workoutReviewId = randomUUID();
		const now = new Date().toISOString();
		const { gsi1pk, gsi1sk } = this.getIndexes(reviewed, coachId, workoutId);

		const newWorkout: WorkoutReviewDynamoDB = {
			PK,
			SK,
			gsi1pk,
			gsi1sk,
			athlete_id: athleteId,
			coach_id: coachId,
			created_at: now,
			updated_at: now,
			id: workoutReviewId,
			notes,
			workout_id: workoutId,
			planned_exercises: plannedExercises,
			realized_exercises: realizedExercises,
			planned_volume: plannedVolume,
			realized_volume: realizedVolume,
			end_time: endTime,
			start_time: startTime,
			reviewed,
			reviewed_at: null,
		};

		await this.dbInstance.create({ ...newWorkout });

		return this.mapToDomain(newWorkout);
	}

	private getKeys(
		athleteId: string,
		workoutId: string,
		reviewed: boolean,
	): TBaseEntity {
		const now = new Date().toISOString();
		const status = reviewed ? "REVIEWED" : "PENDING";

		return {
			PK: `WORKOUTREVIEW|ATHLETE|${athleteId}`,
			SK: `WORKOUTREVIEW|STATUS|${status}|WORKOUT|${workoutId}|${now}`,
		};
	}

	private getIndexes(
		reviewed: boolean,
		coachId: string,
		workoutId: string,
	): TBaseIndexes {
		const status = reviewed ? "REVIEWED" : "PENDING";
		const now = new Date().toISOString();

		return {
			gsi1pk: `WORKOUTREVIEW|COACH|${coachId}`,
			gsi1sk: `WORKOUTREVIEW|STATUS|${status}|WORKOUT|${workoutId}|${now}`,
		};
	}

	private getSkStatus(reviewed?: boolean) {
		return reviewed === undefined ? "" : reviewed ? "REVIEWED" : "PENDING";
	}

	private mapToDomain(workout: WorkoutReviewDynamoDB): WorkoutReview {
		return {
			athleteId: workout.athlete_id,
			coachId: workout.coach_id,
			createdAt: workout.created_at,
			updatedAt: workout.updated_at,
			id: workout.id,
			notes: workout.notes,
			workoutId: workout.workout_id,
			plannedExercises: workout.planned_exercises,
			realizedExercises: workout.realized_exercises,
			plannedVolume: workout.planned_volume,
			realizedVolume: workout.realized_volume,
			endTime: workout.end_time,
			startTime: workout.start_time,
			reviewed: workout.reviewed,
			reviewedAt: workout.reviewed_at,
		};
	}
}

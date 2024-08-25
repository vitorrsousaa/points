import { randomUUID } from "node:crypto";
import type {
	IDatabaseClient,
	TBaseEntity,
} from "@application/database/database";
import type { WorkoutReview } from "@core/domain/workout-review";
import type { IWorkoutReviewRepository, WorkoutReviewDynamoDB } from "./types";

export class WorkoutReviewRepository implements IWorkoutReviewRepository {
	constructor(private readonly dbInstance: IDatabaseClient) {}

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
		} = workout;
		const { PK, SK } = this.getKeys(athleteId);
		const workoutReviewId = randomUUID();
		const now = new Date().toISOString();

		const newWorkout: WorkoutReviewDynamoDB = {
			PK,
			SK,
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
		};

		await this.dbInstance.create({ ...newWorkout });

		return this.mapToDomain(newWorkout);
	}

	private getKeys(athleteId: string): TBaseEntity {
		const now = new Date().toISOString();
		return {
			PK: `WORKOUT|ATHLETE|${athleteId}`,
			SK: `WORKOUT|${now}`,
		};
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
		};
	}
}

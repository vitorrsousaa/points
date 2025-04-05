import { randomUUID } from "node:crypto";
import type {
	IDatabaseClient,
	TBaseEntity,
} from "@application/database/database";
import type { HistoryExercise } from "@core/domain/history-exercise";
import type {
	HistoryExerciseDynamoDB,
	IHistoryExerciseRepository,
} from "./types";

export class HistoryExerciseRepository implements IHistoryExerciseRepository {
	constructor(private readonly dbInstance: IDatabaseClient) {}

	async create(
		historyExercise: Omit<HistoryExercise, "createdAt" | "updatedAt" | "id">,
	): Promise<HistoryExercise> {
		const { athleteId, exerciseId } = historyExercise;

		const historyExerciseId = randomUUID();
		const { PK, SK } = this.getKeys(athleteId, exerciseId);

		const now = new Date().toISOString();

		const newHistoryExercise: HistoryExerciseDynamoDB = {
			id: historyExerciseId,
			PK,
			SK,
			athlete_id: athleteId,
			created_at: now,
			updated_at: now,
			date: historyExercise.date,
			exercise_id: exerciseId,
			sets: historyExercise.sets,
			workout_id: historyExercise.workoutId,
			workout_review_id: historyExercise.workoutReviewId,
		};

		await this.dbInstance.create(newHistoryExercise);

		return this.mapToDomain(newHistoryExercise);
	}

	private getKeys(athleteId: string, exerciseId: string): TBaseEntity {
		const now = new Date().toISOString();

		return {
			PK: `HISTORY#ATHLETE#${athleteId}`,
			SK: `EXERCISE#${exerciseId}#DATE#${now}`,
		};
	}

	private mapToDomain(history: HistoryExerciseDynamoDB): HistoryExercise {
		return {
			athleteId: history.athlete_id,
			exerciseId: history.exercise_id,
			workoutId: history.workout_id,
			workoutReviewId: history.workout_review_id,
			id: history.id,
			createdAt: history.created_at,
			updatedAt: history.updated_at,
			date: history.date,
			sets: history.sets,
		};
	}
}

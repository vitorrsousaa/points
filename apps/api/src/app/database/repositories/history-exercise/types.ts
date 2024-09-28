import type { TBaseEntity } from "@application/database/database";
import type { Prettify } from "@application/utils/types";
import type { HistoryExercise } from "@core/domain/history-exercise";

export type HistoryExerciseDynamoDB = Prettify<
	{
		created_at: string;
		updated_at: string;
		athlete_id: string;
		exercise_id: string;
		workout_id: string;
		workout_review_id: string;
	} & TBaseEntity &
		Omit<
			HistoryExercise,
			| "createdAt"
			| "updatedAt"
			| "athleteId"
			| "exerciseId"
			| "workoutId"
			| "workoutReviewId"
		>
>;

export interface IHistoryExerciseRepository {
	create(
		historyExercise: Omit<HistoryExercise, "createdAt" | "updatedAt" | "id">,
	): Promise<HistoryExercise>;
}

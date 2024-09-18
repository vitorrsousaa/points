import type { TBaseEntity, TBaseIndexes } from "@application/database/database";
import type { Prettify } from "@application/utils/types";
import type { WorkoutReview } from "@core/domain/workout-review";

export type WorkoutReviewDynamoDB = Prettify<
	{
		created_at: string;
		updated_at: string;
		coach_id: string;
		athlete_id: string;
		workout_id: string;
		planned_exercises: WorkoutReview["plannedExercises"];
		realized_exercises: WorkoutReview["realizedExercises"];
		planned_volume: WorkoutReview["plannedVolume"];
		realized_volume: WorkoutReview["realizedVolume"];
		end_time: WorkoutReview["endTime"];
		start_time: WorkoutReview["startTime"];
		reviewed_at: WorkoutReview["reviewedAt"];
	} & TBaseEntity &
		TBaseIndexes &
		Omit<
			WorkoutReview,
			| "createdAt"
			| "updatedAt"
			| "coachId"
			| "athleteId"
			| "workoutId"
			| "plannedExercises"
			| "realizedExercises"
			| "plannedVolume"
			| "realizedVolume"
			| "endTime"
			| "startTime"
			| "reviewedAt"
		>
>;

export interface IWorkoutReviewRepository {
	getAllWorkoutReviewByAthleteId(
		athleteId: string,
		limit: number,
		status?: boolean,
	): Promise<WorkoutReview[]>;
	getAllPendingWorkoutReviewByWorkoutIdAndAthleteId(
		workoutId: string,
		athleteId: string,
	): Promise<WorkoutReview[]>;
	getAllPendingWorkoutReviewByWorkoutIdAndCoachId(
		workoutId: string,
		coachId: string,
	): Promise<WorkoutReview[]>;
	getAllWorkoutReviewByCoachId(
		coachId: string,
		status?: boolean,
	): Promise<WorkoutReview[]>;
	create(
		workout: Omit<WorkoutReview, "createdAt" | "updatedAt" | "id">,
	): Promise<WorkoutReview>;
}

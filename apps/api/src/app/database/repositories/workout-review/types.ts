import type { TBaseEntity } from "@application/database/database";
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
	} & TBaseEntity &
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
		>
>;

export interface IWorkoutReviewRepository {
	// update(workout: Workout): Promise<Workout>;
	// getAllByAthleteId(athleteId: string): Promise<Workout[]>;
	// getById(athleteId: string, workoutId: string): Promise<Workout | null>;
	// delete(athleteId: string, workoutId: string): Promise<void>;
	// getAllActiveByAthleteId(athleteId: string): Promise<Workout[]>;
	create(
		workout: Omit<WorkoutReview, "createdAt" | "updatedAt" | "id">,
	): Promise<WorkoutReview>;
}

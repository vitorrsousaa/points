import type { TBaseEntity } from "@application/database/database";
import type { Prettify } from "@application/utils/types";
import type { Workout } from "@core/domain/workout";

export type WorkoutDynamoDB = Prettify<
	{
		created_at: string;
		updated_at: string;
		coach_id: string;
		athlete_id: string;
	} & TBaseEntity &
		Omit<Workout, "createdAt" | "updatedAt" | "coachId" | "athleteId">
>;

export interface IWorkoutRepository {
	update(workout: Workout): Promise<Workout>;
	getAllByAthleteId(athleteId: string): Promise<Workout[]>;
	getById(id: string): Promise<Workout | null>;
	delete(id: string): Promise<void>;
	create(
		workout: Omit<Workout, "createdAt" | "updatedAt" | "id">,
	): Promise<Workout>;
}

import type { TBaseEntity } from "@application/database/database";
import type { Prettify } from "@application/utils/types";
import type { Athlete } from "@core/domain/athlete";

export type AthleteDynamoDB = Prettify<
	{
		weight: number;
		height: number;
		age: number;
		coach_id: string;
		created_at: string;
		updated_at: string;
		gsi1pk: string;
		gsi1sk: string;
		workout_count: number;
	} & TBaseEntity &
		Omit<Athlete, "coachId" | "createdAt" | "updatedAt" | "workoutCount">
>;

export interface IAthleteRepository {
	update(athlete: Athlete): Promise<Athlete>;
	getAllByCoachId(coachId: string): Promise<Athlete[]>;
	getById(id: string): Promise<Athlete | null>;
	create(athlete: Omit<Athlete, "createdAt" | "updatedAt">): Promise<Athlete>;
}

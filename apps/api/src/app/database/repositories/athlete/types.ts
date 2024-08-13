import type { TBaseEntity } from "@application/database/database";
import type { Prettify } from "@application/utils/types";
import type { Athlete } from "@core/domain/athlete";

export type AthleteDynamoDB = Prettify<
	{
		weight: number;
		height: number;
		age: number;
		account_confirmation: boolean;
		coach_id: string;
	} & TBaseEntity &
		Omit<Athlete, "accountConfirmation" | "coachId">
>;

export interface IAthleteRepository {
	update(athlete: Athlete): Promise<Athlete>;
	getAllByCoachId(coachId: string): Promise<Athlete[]>;
	getById(id: string): Promise<Athlete | null>;
}

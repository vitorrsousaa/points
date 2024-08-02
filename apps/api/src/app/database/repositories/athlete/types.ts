import type { TBaseEntity } from "@application/database/database";
import type { Prettify } from "@application/utils/types";
import type { Athlete } from "@core/domain/athlete";
import type { User } from "@core/domain/user";

export type AthleteDynamoDB = Prettify<
	{
		coachId: string;
		weight: number;
		height: number;
		age: number;
	} & TBaseEntity &
		Omit<User, "id">
>;

export interface IAthleteRepository {
	update(athlete: Athlete): Promise<Athlete>;
	getAllByCoachId(coachId: string): Promise<Athlete[]>;
}

import type { TBaseEntity } from "@application/database/database";
import type { Prettify } from "@application/utils/types";
import type { Coach } from "@core/domain/coach";

export type CoachDynamoDB = Prettify<
	{
		name: string;
		created_at: string;
		updated_at: string;
		// gsi1pk: string;
		// gsi1sk: string;
	} & TBaseEntity &
		Omit<Coach, "createdAt" | "updatedAt">
>;

export interface ICoachRepository {
	getById(id: string): Promise<Coach | null>;
	create(coach: Omit<Coach, "createdAt" | "updatedAt">): Promise<Coach>;
}

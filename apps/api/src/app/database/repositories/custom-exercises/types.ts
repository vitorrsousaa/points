import type { TBaseEntity } from "@application/database/database";
import type { Prettify } from "@application/utils/types";
import type { CustomExercise, Equipment } from "@core/domain/exercise";

export type CustomExerciseDynamoDB = Prettify<
	{
		name: string;
		equipment: Equipment;
		target: "S" | "B" | "D" | null;
		primary_muscle: string;
		secondary_muscle: string | null;
		coach_id: string;
		created_at: string;
		updated_at: string;
	} & TBaseEntity &
		Omit<
			CustomExercise,
			| "primaryMuscle"
			| "secondaryMuscle"
			| "coachId"
			| "createdAt"
			| "updatedAt"
		>
>;

export interface ICustomExerciseRepository {
	create(
		CustomExerciseInput: Omit<CustomExercise, "id" | "createdAt" | "updatedAt">,
	): Promise<CustomExercise>;
	getAll(coachId: string): Promise<CustomExercise[]>;
}

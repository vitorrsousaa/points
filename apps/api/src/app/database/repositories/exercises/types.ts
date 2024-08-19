import type { TBaseEntity } from "@application/database/database";
import type { Prettify } from "@application/utils/types";
import type { Equipment, Exercise } from "@core/domain/exercise";

export type ExerciseDynamoDB = Prettify<
	{
		name: string;
		equipment: Equipment;
		target: "S" | "B" | "D" | null;
		primary_muscle: string;
		secondary_muscle: string | null;
		created_at: string;
	} & TBaseEntity &
		Omit<Exercise, "primaryMuscle" | "secondaryMuscle">
>;

export interface IExerciseRepository {
	create(exerciseInput: Omit<Exercise, "id">): Promise<Exercise>;
	getAll(): Promise<Exercise[]>;
}

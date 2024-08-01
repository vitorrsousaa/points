import type { TBaseEntity } from "@application/database/database";
import type { Prettify } from "@application/utils/types";

enum Equipment {
	BARRA = "BARRA",
	HALTERES = "HALTERES",
	MAQUINA = "MAQUINA",
}

export type ExercisePersistance = {
	name: string;
	equipment: Equipment;
	muscleGroup: string;
	target: string | null;
};

export type ExerciseDynamoDB = Prettify<
	{
		name: string;
		equipment: Equipment;
		muscleGroup: string;
		target: string | null;
	} & TBaseEntity
>;

export interface IExerciseRepository {
	create(exerciseInput: ExercisePersistance): Promise<ExercisePersistance>;
}

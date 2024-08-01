import { randomUUID } from "node:crypto";
import { DATABASE_TABLE } from "@application/config/tables";
import type { IDatabaseClient } from "@application/database/database";
import type { Exercise } from "@core/domain/exercise";
import type {
	ExerciseDynamoDB,
	ExercisePersistance,
	IExerciseRepository,
} from "./types";

export class ExerciseRepository implements IExerciseRepository {
	private TABLE_NAME = DATABASE_TABLE.TABLE_NAME;
	private DEFAULT_EXERCISE_ID = "EXERCISE";
	private DEFAULT_TRAINING_ID = "TRAINING";

	constructor(private readonly dbInstance: IDatabaseClient) {}

	async create(exerciseInput: ExercisePersistance): Promise<Exercise> {
		const exerciseId = randomUUID();

		const { PK, SK } = this.getKeys({ exerciseId });

		const newExercise: ExerciseDynamoDB = {
			PK,
			SK,
			name: exerciseInput.name,
			equipment: exerciseInput.equipment,
			muscleGroup: exerciseInput.muscleGroup,
			target: exerciseInput.target,
		};

		await this.dbInstance.create(this.TABLE_NAME, {
			...newExercise,
		});

		return this.mapToExerciseDomain(newExercise);
	}

	private getKeys({
		exerciseId,
		trainingId,
	}: { exerciseId: string; trainingId?: string }): { PK: string; SK: string } {
		return {
			PK: trainingId
				? this.setTrainingId(trainingId)
				: this.DEFAULT_EXERCISE_ID,
			SK: this.setExerciseId(exerciseId),
		};
	}

	private setExerciseId(id: string): string {
		return `${this.DEFAULT_EXERCISE_ID}|${id}`;
	}

	private setTrainingId(id: string): string {
		return `${this.DEFAULT_TRAINING_ID}|${id}`;
	}

	private getExerciseId(SK: string): string {
		return SK.split("|")[1];
	}

	private mapToExerciseDomain(exercise: ExerciseDynamoDB): Exercise {
		return {
			name: exercise.name,
			equipment: exercise.equipment,
			muscleGroup: exercise.muscleGroup,
			target: exercise.target,
			id: this.getExerciseId(exercise.SK),
		};
	}
}

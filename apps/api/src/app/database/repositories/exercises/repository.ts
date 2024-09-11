import { randomUUID } from "node:crypto";
import type { IDatabaseClient } from "@application/database/database";
import type { Exercise } from "@core/domain/exercise";
import type { ExerciseDynamoDB, IExerciseRepository } from "./types";

export class ExerciseRepository implements IExerciseRepository {
	private DEFAULT_EXERCISE_ID = "EXERCISE";

	constructor(private readonly dbInstance: IDatabaseClient) {}

	async create(exerciseInput: Omit<Exercise, "id">): Promise<Exercise> {
		const exerciseId = randomUUID();

		const { PK, SK } = this.getKeys(exerciseId);

		const now = new Date().toISOString();

		const newExercise: ExerciseDynamoDB = {
			PK,
			SK,
			name: exerciseInput.name,
			equipment: exerciseInput.equipment,
			primary_muscle: exerciseInput.primaryMuscle,
			secondary_muscle: exerciseInput.secondaryMuscle,
			target: exerciseInput.target,
			created_at: now,
			id: exerciseId,
		};

		await this.dbInstance.create({
			...newExercise,
		});

		return this.mapToExerciseDomain(newExercise);
	}

	async getAll(): Promise<Exercise[]> {
		const exercises = await this.dbInstance.query<ExerciseDynamoDB[]>({
			KeyConditionExpression: "PK = :primaryKey and begins_with(SK, :sortKey)",
			ExpressionAttributeValues: {
				":sortKey": this.DEFAULT_EXERCISE_ID,
				":primaryKey": this.DEFAULT_EXERCISE_ID,
			},
		});

		return exercises
			? exercises.map((exercise) => this.mapToExerciseDomain(exercise))
			: [];
	}

	private getKeys(exerciseId: string): { PK: string; SK: string } {
		return {
			PK: "EXERCISE",
			SK: `EXERCISE|${exerciseId}`,
		};
	}

	private mapToExerciseDomain(exercise: ExerciseDynamoDB): Exercise {
		return {
			name: exercise.name,
			equipment: exercise.equipment,
			primaryMuscle: exercise.primary_muscle,
			secondaryMuscle: exercise.secondary_muscle,
			target: exercise.target,
			id: exercise.id,
		};
	}
}

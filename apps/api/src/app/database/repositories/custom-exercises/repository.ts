import { randomUUID } from "node:crypto";
import type { IDatabaseClient } from "@application/database/database";
import type { CustomExercise } from "@core/domain/exercise";
import type {
	CustomExerciseDynamoDB,
	ICustomExerciseRepository,
} from "./types";

export class CustomExerciseRepository implements ICustomExerciseRepository {
	private DEFAULT_EXERCISE_ID = "EXERCISECUSTOM";

	constructor(private readonly dbInstance: IDatabaseClient) {}

	async create(
		exerciseInput: Omit<CustomExercise, "id" | "createdAt" | "updatedAt">,
	): Promise<CustomExercise> {
		const exerciseId = randomUUID();

		const { PK, SK } = this.getKeys(exerciseInput.coachId);

		const now = new Date().toISOString();

		const newExercise: CustomExerciseDynamoDB = {
			PK,
			SK,
			name: exerciseInput.name,
			equipment: exerciseInput.equipment,
			primary_muscle: exerciseInput.primaryMuscle,
			secondary_muscle: exerciseInput.secondaryMuscle,
			target: exerciseInput.target,
			created_at: now,
			updated_at: now,
			coach_id: exerciseInput.coachId,
			id: exerciseId,
		};

		await this.dbInstance.create({
			...newExercise,
		});

		return this.mapToExerciseDomain(newExercise);
	}

	async getAll(coachId: string): Promise<CustomExercise[]> {
		const { PK } = this.getKeys(coachId);

		const exercises = await this.dbInstance.query<CustomExerciseDynamoDB[]>({
			KeyConditionExpression: "PK = :primaryKey",
			ExpressionAttributeValues: {
				":primaryKey": PK,
			},
		});

		return exercises
			? exercises.map((exercise) => this.mapToExerciseDomain(exercise))
			: [];
	}

	private getKeys(coachId: string): { PK: string; SK: string } {
		const now = new Date().toISOString();

		return {
			PK: `${this.DEFAULT_EXERCISE_ID}|COACH|${coachId}`,
			SK: `EXERCISE|${now}`,
		};
	}

	private mapToExerciseDomain(
		exercise: CustomExerciseDynamoDB,
	): CustomExercise {
		return {
			name: exercise.name,
			equipment: exercise.equipment,
			primaryMuscle: exercise.primary_muscle,
			secondaryMuscle: exercise.secondary_muscle,
			target: exercise.target,
			id: exercise.id,
			coachId: exercise.coach_id,
			createdAt: exercise.created_at,
			updatedAt: exercise.updated_at,
		};
	}
}

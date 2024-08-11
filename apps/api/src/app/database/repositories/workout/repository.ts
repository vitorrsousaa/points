import { randomUUID } from "node:crypto";
import { DATABASE_TABLE } from "@application/config/tables";
import type {
	IDatabaseClient,
	TBaseEntity,
} from "@application/database/database";
import type { Workout } from "@core/domain/workout";
import type { IWorkoutRepository, WorkoutDynamoDB } from "./types";

export class WorkoutRepository implements IWorkoutRepository {
	private TABLE_NAME = DATABASE_TABLE.TABLE_NAME;

	constructor(private readonly dbInstance: IDatabaseClient) {}
	async create(
		workout: Omit<Workout, "createdAt" | "updatedAt">,
	): Promise<Workout> {
		const { athleteId, coachId, name, exercises } = workout;
		const { PK, SK } = this.getKeys(athleteId);
		const workoutId = randomUUID();
		const now = new Date().toISOString();

		const newWorkout: WorkoutDynamoDB = {
			PK,
			SK,
			athlete_id: athleteId,
			coach_id: coachId,
			created_at: now,
			updated_at: now,
			id: workoutId,
			name,
			exercises,
		};

		await this.dbInstance.create(this.TABLE_NAME, { ...newWorkout });

		return {
			exercises,
			name,
			id: workoutId,
			athleteId,
			coachId,
			createdAt: now,
			updatedAt: now,
		};
	}
	update(workout: Workout): Promise<Workout> {
		throw new Error("Method not implemented.");
	}
	getAllByAthleteId(athleteId: string): Promise<Workout[]> {
		throw new Error("Method not implemented.");
	}
	getById(id: string): Promise<Workout | null> {
		throw new Error("Method not implemented.");
	}
	delete(id: string): Promise<void> {
		throw new Error("Method not implemented.");
	}

	private getKeys(athleteId: string): TBaseEntity {
		const now = new Date().toISOString();
		return {
			PK: `WORKOUT|ATHLETE|${athleteId}`,
			SK: `WORKOUT|${now}`,
		};
	}
}

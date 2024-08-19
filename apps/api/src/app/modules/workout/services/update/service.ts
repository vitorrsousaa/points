import type { IWorkoutRepository } from "@application/database/repositories/workout";
import type { IService } from "@application/interfaces/service";
import { CreateWorkoutInputSchema, type Workout } from "@core/domain/workout";
import * as z from "zod";
import { WorkoutNotFound } from "../../errors/workout-not-found";
import { WorkoutIsNotOwned } from "../../errors/workout-not-owned";

export const UpdateInputServiceSchema = CreateWorkoutInputSchema.extend({
	coachId: z.string().uuid(),
	athleteId: z.string().uuid(),
	id: z.string().uuid(),
});

export type TUpdate = z.infer<typeof UpdateInputServiceSchema>;

export type IUpdateInput = TUpdate;

export type IUpdateOutput = Workout;

export type IUpdateService = IService<IUpdateInput, IUpdateOutput>;

export class UpdateService implements IUpdateService {
	constructor(private readonly workoutRepository: IWorkoutRepository) {}

	async execute(updateInput: IUpdateInput): Promise<IUpdateOutput> {
		const workout = await this.workoutRepository.getById(
			updateInput.athleteId,
			updateInput.id,
		);

		if (!workout) {
			throw new WorkoutNotFound();
		}

		if (workout.coachId !== updateInput.coachId) {
			throw new WorkoutIsNotOwned();
		}

		const updatedWorkout = await this.workoutRepository.update({
			...workout,
			name: updateInput.name,
			exercises: updateInput.exercises,
			description: updateInput.description,
			isActive: updateInput.isActive,
		});

		return updatedWorkout;
	}
}

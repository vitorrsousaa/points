import type { IWorkoutRepository } from "@application/database/repositories/workout";
import type { IService } from "@application/interfaces/service";
import * as z from "zod";
import { CoachNotAuthorized } from "../../errors/coach-not-authorized";
import { WorkoutNotFound } from "../../errors/workout-not-found";

export const DeleteInputServiceSchema = z.object({
	coachId: z.string().uuid(),
	athleteId: z.string().uuid(),
	workoutId: z.string().uuid(),
});

export type TDelete = z.infer<typeof DeleteInputServiceSchema>;

export type IDeleteInput = TDelete;

export type IDeleteOutput = null;

export type IDeleteService = IService<IDeleteInput, IDeleteOutput>;

export class DeleteService implements IDeleteService {
	constructor(private readonly workoutRepository: IWorkoutRepository) {}

	async execute(deleteInput: IDeleteInput): Promise<IDeleteOutput> {
		const { workoutId, coachId, athleteId } = deleteInput;
		const workout = await this.workoutRepository.getById(athleteId, workoutId);

		console.log(workout);

		if (!workout) {
			throw new WorkoutNotFound();
		}

		if (workout.coachId !== coachId) {
			throw new CoachNotAuthorized();
		}

		if (workout.athleteId !== athleteId) {
			throw new CoachNotAuthorized();
		}

		await this.workoutRepository.delete(athleteId, workoutId);

		return null;
	}
}

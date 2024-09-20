import type { IAthleteRepository } from "@application/database/repositories/athlete";
import type { IWorkoutReviewRepository } from "@application/database/repositories/workout-review";
import type { IService } from "@application/interfaces/service";
import { getWorkoutVolume } from "@application/modules/workout/functions/get-workout-volume";
import { AthleteNotFound } from "@application/shared/errors/athlete-not-found";
import {
	type WorkoutReview,
	WorkoutReviewSchema,
} from "@core/domain/workout-review";
import type * as z from "zod";

export const CreateInputServiceSchema = WorkoutReviewSchema.omit({
	realizedVolume: true,
	reviewed: true,
	reviewedAt: true,
	plannedVolume: true,
});

export type TCreate = z.infer<typeof CreateInputServiceSchema>;

export type ICreateInput = TCreate;

export type ICreateOutput = WorkoutReview;

export type ICreateService = IService<ICreateInput, ICreateOutput>;

export class CreateService implements ICreateService {
	private DEFAULT_REVIEWED = false;

	constructor(
		private athleteRepository: IAthleteRepository,
		private workoutReviewRepository: IWorkoutReviewRepository,
	) {}

	async execute(createInput: ICreateInput): Promise<ICreateOutput> {
		const {
			athleteId,
			coachId,
			workoutId,
			notes,
			plannedExercises,
			realizedExercises,
			endTime,
			startTime,
		} = createInput;

		const athlete = await this.athleteRepository.getById(athleteId);

		if (!athlete) {
			throw new AthleteNotFound();
		}

		const realizedVolume = getWorkoutVolume(realizedExercises);
		const plannedVolume = getWorkoutVolume(plannedExercises);

		const workoutReview = await this.workoutReviewRepository.create({
			athleteId,
			coachId,
			notes,
			workoutId,
			plannedExercises,
			realizedExercises,
			plannedVolume,
			realizedVolume,
			endTime,
			startTime,
			reviewed: this.DEFAULT_REVIEWED,
		});

		// CRIAR O PERSONAL RECORD

		const newWorkoutCount = athlete.workoutCount + 1;

		await this.athleteRepository.update({
			...athlete,
			workoutCount: newWorkoutCount,
		});

		return workoutReview;
	}
}

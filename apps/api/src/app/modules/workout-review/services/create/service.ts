import type { IAthleteRepository } from "@application/database/repositories/athlete";
import type { IWorkoutRepository } from "@application/database/repositories/workout";
import type { IWorkoutReviewRepository } from "@application/database/repositories/workout-review";
import type { IService } from "@application/interfaces/service";
import { getWorkoutVolume } from "@application/modules/workout/functions/get-workout-volume";
import { AthleteNotFound } from "@application/shared/errors/athlete-not-found";
import { WorkoutNotFound } from "@application/shared/errors/workout-not-found";
import {
	type WorkoutReview,
	WorkoutReviewSchema,
} from "@core/domain/workout-review";
import type * as z from "zod";
import { AthleteNotAssigned } from "../../errors/athlete-not-assigned";
import { WorkoutNotAssignedToAthlete } from "../../errors/workout-not-assigned-athlete";
import { WorkoutNotAssignedToCoach } from "../../errors/workout-not-assigned-coach";

export const CreateInputServiceSchema = WorkoutReviewSchema.omit({
	realizedVolume: true,
	reviewed: true,
	reviewedAt: true,
	plannedVolume: true,
	plannedExercises: true,
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
		private workoutRepository: IWorkoutRepository,
	) {}

	async execute(createInput: ICreateInput): Promise<ICreateOutput> {
		const {
			athleteId,
			coachId,
			workoutId,
			notes,
			realizedExercises,
			endTime,
			startTime,
		} = createInput;

		const athlete = await this.athleteRepository.getById(athleteId);

		if (!athlete) {
			throw new AthleteNotFound();
		}

		if (athlete.coachId !== coachId) {
			throw new AthleteNotAssigned();
		}

		const workout = await this.workoutRepository.getById(athleteId, workoutId);

		if (!workout) {
			throw new WorkoutNotFound();
		}

		if (workout.athleteId !== athleteId) {
			throw new WorkoutNotAssignedToAthlete();
		}

		if (workout.coachId !== coachId) {
			throw new WorkoutNotAssignedToCoach();
		}

		const plannedExercises = workout.exercises;
		const plannedVolume = workout.volume;

		const realizedVolume = getWorkoutVolume(realizedExercises);

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

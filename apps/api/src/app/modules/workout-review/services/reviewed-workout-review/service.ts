import type { IAthleteRepository } from "@application/database/repositories/athlete";
import type { IUserRepository } from "@application/database/repositories/user";
import type { IWorkoutReviewRepository } from "@application/database/repositories/workout-review";
import type { IService } from "@application/interfaces/service";
import { AthleteNotFound } from "@application/shared/errors/athlete-not-found";
import { CoachNotFound } from "@application/shared/errors/coach-not-found";
import {
	type WorkoutReview,
	WorkoutReviewSchema,
} from "@core/domain/workout-review";
import * as z from "zod";
import { AthleteNotAssigned } from "../../errors/athlete-not-assigned";

export const ReviewedWorkoutReviewInputServiceSchema =
	WorkoutReviewSchema.extend({
		userId: z.string().uuid(),
		createdAt: z.string(),
		id: z.string().uuid(),
		updatedAt: z.string(),
	});

export type TReviewedWorkoutReview = z.infer<
	typeof ReviewedWorkoutReviewInputServiceSchema
>;

export type IReviewedWorkoutReviewInput = TReviewedWorkoutReview;

export type IReviewedWorkoutReviewOutput = WorkoutReview;

export type IReviewedWorkoutReviewService = IService<
	IReviewedWorkoutReviewInput,
	IReviewedWorkoutReviewOutput
>;

export class ReviewedWorkoutReviewService
	implements IReviewedWorkoutReviewService
{
	constructor(
		private readonly userRepository: IUserRepository,
		private readonly workoutReviewRepository: IWorkoutReviewRepository,
		private readonly athleteRepository: IAthleteRepository,
	) {}

	async execute(
		reviewedWorkoutReviewInput: IReviewedWorkoutReviewInput,
	): Promise<IReviewedWorkoutReviewOutput> {
		const { userId, athleteId, coachId, ...otherProps } =
			reviewedWorkoutReviewInput;

		const user = await this.userRepository.getById(userId);

		if (!user) {
			throw new CoachNotFound();
		}

		const isCoach = user.role.includes("COACH");

		if (!isCoach) {
			throw new CoachNotFound();
		}

		const athlete = await this.athleteRepository.getById(athleteId);

		if (!athlete) {
			throw new AthleteNotFound();
		}

		if (athlete.coachId !== coachId) {
			throw new AthleteNotAssigned();
		}

		const now = new Date().toISOString();

		const workoutReview: WorkoutReview = {
			...otherProps,
			athleteId,
			coachId,
			reviewedAt: now,
			reviewed: true,
		};

		const workoutReviewResponse =
			await this.workoutReviewRepository.review(workoutReview);

		return workoutReviewResponse;
	}
}

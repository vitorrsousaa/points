import type { IWorkoutReviewRepository } from "@application/database/repositories/workout-review";
import type { IService } from "@application/interfaces/service";
import type { WorkoutReview } from "@core/domain/workout-review";
import * as z from "zod";
import { ParameterIsRequired } from "../../errors/parameter-is-required";

export const GetAllWorkoutReviewInputServiceSchema = z
	.object({
		coachId: z
			.string()
			.uuid()
			.optional()
			.transform((val) => (val ? val : undefined)),
		athleteId: z
			.string()
			.uuid()
			.optional()
			.transform((val) => (val ? val : undefined)),
		reviewed: z
			.string()
			.optional()
			.transform((val) =>
				val === "true" ? true : val === "false" ? false : undefined,
			),
		limit: z
			.string()
			.optional()
			.transform((val) => (val ? Number.parseInt(val, 10) : undefined))
			.default("10"),
	})
	.refine((data) => data.coachId || data.athleteId, {
		message: "You must provide a coachId or athleteId",
	});

export type TGetAllWorkoutReview = z.infer<
	typeof GetAllWorkoutReviewInputServiceSchema
>;

export type IGetAllWorkoutReviewInput = TGetAllWorkoutReview;

export type IGetAllWorkoutReviewOutput = WorkoutReview[];

export type IGetAllWorkoutReviewService = IService<
	IGetAllWorkoutReviewInput,
	IGetAllWorkoutReviewOutput
>;

export class GetAllWorkoutReviewService implements IGetAllWorkoutReviewService {
	constructor(
		private readonly workoutReviewRepository: IWorkoutReviewRepository,
	) {}

	async execute(
		getAllWorkoutReviewInput: IGetAllWorkoutReviewInput,
	): Promise<IGetAllWorkoutReviewOutput> {
		const { coachId, athleteId, reviewed, limit } = getAllWorkoutReviewInput;

		if (!coachId && !athleteId) throw new ParameterIsRequired();

		if (athleteId)
			return this.workoutReviewRepository.getAllWorkoutReviewByAthleteId(
				athleteId,
				limit,
				reviewed,
			);

		if (coachId) {
			return this.workoutReviewRepository.getAllWorkoutReviewByCoachId(
				coachId,
				reviewed,
			);
		}

		throw new ParameterIsRequired();
	}
}

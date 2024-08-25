import type { Prettify } from "@application/utils/types";
import type { BaseEntity } from "@core/domain/base";
import * as z from "zod";

export const WorkoutReviewSchema = z.object({
	notes: z.string(),
	coachId: z.string().uuid(),
	athleteId: z.string().uuid(),
});

export type CreateWorkoutReview = z.infer<typeof WorkoutReviewSchema>;

export type WorkoutReview = Prettify<BaseEntity & CreateWorkoutReview>;

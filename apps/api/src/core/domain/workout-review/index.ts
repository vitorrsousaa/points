import type { Prettify } from "@application/utils/types";
import type { BaseEntity } from "@core/domain/base";
import * as z from "zod";
import { WorkoutExerciseSchema, WorkoutVolumeSchema } from "../workout";

export const WorkoutReviewSchema = z.object({
	notes: z.string(),
	coachId: z.string().uuid(),
	athleteId: z.string().uuid(),
	workoutId: z.string().uuid(),
	startTime: z.number(),
	endTime: z.number(),
	plannedExercises: z.array(WorkoutExerciseSchema),
	realizedExercises: z.array(WorkoutExerciseSchema),
	plannedVolume: WorkoutVolumeSchema,
	realizedVolume: WorkoutVolumeSchema,
	reviewed: z.boolean(),
	reviewedAt: z.string().nullable().optional(),
	workoutName: z.string(),
});

export type CreateWorkoutReview = z.infer<typeof WorkoutReviewSchema>;

export type WorkoutReview = Prettify<BaseEntity & CreateWorkoutReview>;

import type { Prettify } from "@application/utils/types";
import type { BaseEntity } from "@core/domain/base";
import * as z from "zod";
import { WorkoutExerciseSchema, WorkoutVolumeSchema } from "../workout";

export const WorkoutReviewSchema = z.object({
	notes: z.string(),
	coachId: z.string().uuid(),
	athleteId: z.string().uuid(),
	workoutId: z.string().uuid(),
	plannedExercises: z.array(WorkoutExerciseSchema),
	realizedExercises: z.array(WorkoutExerciseSchema),
	plannedVolume: WorkoutVolumeSchema,
	realizedVolume: WorkoutVolumeSchema,
});

export type CreateWorkoutReview = z.infer<typeof WorkoutReviewSchema>;

export type WorkoutReview = Prettify<BaseEntity & CreateWorkoutReview>;

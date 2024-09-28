import type { Prettify } from "@application/utils/types";
import * as z from "zod";
import type { BaseEntity } from "../base";
import { WorkoutSetSchema } from "../workout";

export const CreateHistoryExerciseSchema = z.object({
	exerciseId: z.string(),
	sets: z.array(WorkoutSetSchema),
	workoutId: z.string(),
	workoutReviewId: z.string(),
	date: z.string(),
	athleteId: z.string(),
});

export type CreateHistoryExercise = z.infer<typeof CreateHistoryExerciseSchema>;

export type HistoryExercise = Prettify<BaseEntity & CreateHistoryExercise>;

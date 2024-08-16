import type { Prettify } from "@application/utils/types";
import { CreateExerciseInputSchema, type Exercise } from "../exercise";

import * as z from "zod";

export const WorkoutSetSchema = z.object({
	reps: z.number().min(0),
	weight: z.number().min(0),
	rpe: z.number().min(0).max(10).optional(),
	type: z.enum(["W", "T"]),
});

export const WorkoutExerciseSchema = CreateExerciseInputSchema.extend({
	restTime: z.string(),
	exerciseId: z.string(),
	notes: z.string(),
	sets: z.array(WorkoutSetSchema),
});

export const CreateWorkoutInputSchema = z.object({
	name: z.string(),
	exercises: z.array(WorkoutExerciseSchema),
});

export type CreateWorkoutSchema = z.infer<typeof CreateWorkoutInputSchema>;

export type Workout = Prettify<
	CreateWorkoutSchema & {
		id: string;
		createdAt: string;
		updatedAt: string;
		coachId: string;
		athleteId: string;
		visibility: boolean;
	}
>;

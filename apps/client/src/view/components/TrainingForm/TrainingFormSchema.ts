import * as z from "zod";

export const ExerciseSetSchema = z.object({
	reps: z.number().int().min(1, "Mínimo de 1 repetição"),
	weight: z.number().int().min(0, "Mínimo de 0 kg"),
	rpe: z.number().int().min(0, "Mínimo de 0 RPE").max(10, "Máximo de 10 RPE"),
	type: z.enum(["W", "T"]),
});

export const ExerciseFormSchema = z.object({
	name: z.string().min(1, "O nome é obrigatório"),
	target: z.enum(["S", "B", "D"]).nullable(),
	notes: z.string(),
	exerciseId: z.string(),
	restTime: z.string(),
	equipment: z.enum(["Barra", "Halter", "Maquina"]),
	primaryMuscle: z.string(),
	secondaryMuscle: z.string().nullable(),
	sets: z.array(ExerciseSetSchema).min(1, "Adicione pelo menos uma série"),
});

export const TrainingFormSchema = z.object({
	name: z.string().min(1, "O nome é obrigatório"),
	isActive: z.boolean().default(false).optional(),
	description: z.string(),
	exercises: z
		.array(ExerciseFormSchema)
		.min(1, "Adicione pelo menos um exercício"),
});

export type TTrainingFormSchema = z.infer<typeof TrainingFormSchema>;

export type TExerciseFormSchema = z.infer<typeof ExerciseFormSchema>;

export const defaultInitialValues: TTrainingFormSchema = {
	name: "",
	exercises: [],
	description: "",
};

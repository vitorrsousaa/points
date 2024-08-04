import * as z from "zod";

export const ExerciseSetSchema = z.object({
	reps: z.number().int().min(1, "Mínimo de 1 repetição"),
	weight: z.number().int().min(0, "Mínimo de 0 kg"),
});

export const ExerciseFormSchema = z.object({
	name: z.string().min(1, "O nome é obrigatório"),
	target: z.string().nullable(),
	notes: z.string(),
	exerciseId: z.string(),
	restTime: z.string(),
	sets: z.array(ExerciseSetSchema).min(1, "Adicione pelo menos uma série"),
});

export const TrainingFormSchema = z.object({
	name: z.string().min(1, "O nome é obrigatório"),
	exercises: z
		.array(ExerciseFormSchema)
		.min(1, "Adicione pelo menos um exercício"),
});

export type TTrainingFormSchema = z.infer<typeof TrainingFormSchema>;

export type TExerciseFormSchema = z.infer<typeof ExerciseFormSchema>;

export const defaultInitialValues: TTrainingFormSchema = {
	name: "",
	exercises: [],
};

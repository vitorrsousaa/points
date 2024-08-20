import * as z from "zod";

export const ExerciseFormSchema = z.object({
	name: z.string(),
	equipment: z.enum(["Barra", "Halter", "Maquina"]),
	primaryMuscle: z.string(),
	secondaryMuscle: z.string().nullable(),
	target: z.enum(["D", "S", "B"]).nullable(),
});

export type TExerciseFormSchema = z.infer<typeof ExerciseFormSchema>;

export const defaultInitialValues: TExerciseFormSchema = {
	name: "",
	equipment: "Barra",
	primaryMuscle: "Peitoral",
	secondaryMuscle: null,
	target: null,
};

export const muscles = [
	"Abdomen",
	"Biceps",
	"Dorsal",
	"Gluteos",
	"Quadriceps",
	"Posteriores",
	"Deltoides",
	"Peitoral",
	"Triceps",
	"Adutor",
];

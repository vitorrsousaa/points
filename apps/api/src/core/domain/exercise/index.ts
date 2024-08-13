import * as z from "zod";

export const EquipmentEnumSchema = z.enum(["Barra", "Halter", "Maquina"]);

export type Equipment = z.infer<typeof EquipmentEnumSchema>;

export const CreateExerciseInputSchema = z.object({
	name: z.string(),
	equipment: EquipmentEnumSchema,
	primaryMuscle: z.string(),
	secondaryMuscle: z.string().nullable(),
	target: z.enum(["B", "S", "D"]).nullable(),
});

export const ExerciseSchema = CreateExerciseInputSchema.extend({
	id: z.string(),
});

export type Exercise = z.infer<typeof ExerciseSchema>;

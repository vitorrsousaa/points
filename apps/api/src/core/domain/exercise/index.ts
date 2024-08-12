import * as z from "zod";

export const EquipmentEnumSchema = z.enum(["Barra", "Halter", "Maquina"]);

export type Equipment = z.infer<typeof EquipmentEnumSchema>;

export const CreateExerciseInputSchema = z.object({
	name: z.string(),
	equipment: EquipmentEnumSchema,
	muscleGroup: z.string(),
	target: z.enum(["B", "S", "D"]).optional().nullable(),
});

export const ExerciseSchema = CreateExerciseInputSchema.extend({
	id: z.string(),
});

export type Exercise = z.infer<typeof ExerciseSchema>;

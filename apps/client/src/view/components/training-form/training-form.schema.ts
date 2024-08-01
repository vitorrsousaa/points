import * as z from "zod";

export const TrainingFormSchema = z.object({
	name: z.string().min(1, "O nome é obrigatório"),
});

export type TTrainingFormSchema = z.infer<typeof TrainingFormSchema>;

export const defaultInitialValues: TTrainingFormSchema = {
	name: "",
};

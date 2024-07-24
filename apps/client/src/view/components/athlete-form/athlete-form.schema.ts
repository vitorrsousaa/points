import * as z from "zod";

export const AthleteFormSchema = z.object({
	name: z.string().min(1, "O nome é obrigatório"),
	weight: z.number().min(1, "Precisa ser maior do que zero").nonnegative(),
	age: z.number().min(1, "Precisa ser maior do que zero").nonnegative(),
	status: z.boolean(),
});

export type TAthleteFormSchema = z.infer<typeof AthleteFormSchema>;

export const defaultInitialValues: TAthleteFormSchema = {
	name: "",
	weight: 0,
	status: true,
	age: 0,
};

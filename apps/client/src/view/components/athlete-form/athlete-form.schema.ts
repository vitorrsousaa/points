import * as z from "zod";

export const AthleteFormSchema = z.object({
	firstName: z.string().min(1, "O nome é obrigatório"),
	lastName: z.string().min(1, "O nome é obrigatório"),
	weight: z.number().min(1, "Precisa ser maior do que zero").nonnegative(),
	age: z.number().min(1, "Precisa ser maior do que zero").nonnegative(),
	height: z.number().min(1, "Precisa ser maior do que zero").nonnegative(),
	isActive: z.boolean(),
	email: z.string().email("Email inválido"),
});

export type TAthleteFormSchema = z.infer<typeof AthleteFormSchema>;

export const defaultInitialValues: TAthleteFormSchema = {
	firstName: "",
	lastName: "",
	weight: 0,
	isActive: true,
	age: 0,
	height: 0,
	email: "",
};

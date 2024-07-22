import * as z from "zod";

export const ProductFormSchema = z.object({
	name: z.string().min(1, "O nome é obrigatório"),
	price: z.number().min(1, "Precisa ser maior do que zero").nonnegative(),
	isAvailable: z.boolean(),
	category: z.string().min(1, "Digite uma categoria"),
	description: z
		.string({
			message: "A descrição é obrigatória",
		})
		.min(1, "A descrição é obrigatória"),
});

export type TProductFormSchema = z.infer<typeof ProductFormSchema>;

export const defaultInitialValues: TProductFormSchema = {
	name: "",
	price: 0,
	isAvailable: true,
	category: "",
	description: "",
};

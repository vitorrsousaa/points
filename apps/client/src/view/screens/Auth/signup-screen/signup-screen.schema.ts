import z from "zod";

export const SignUpFormSchema = z.object({
	firstName: z
		.string({ required_error: "Este campo é obrigatório" })
		.min(2, "O nome deve conter ao menos 2 caracteres.")
		.max(50),
	lastName: z
		.string({ required_error: "Este campo é obrigatório" })
		.min(2, "O nome deve conter ao menos 2 caracteres.")
		.max(50),
	email: z
		.string({ required_error: "O email é obrigatório." })
		.email("Formato de email inválido."),
	password: z
		.string({ required_error: "A senha é obrigatória." })
		.min(6, "A senha deve conter ao menos 6 caracteres.")
		.regex(/[a-zA-Z]/, "A senha deve conter ao menos uma letra.")
		.regex(/[0-9]/, "A senha deve conter ao menos um número.")
		.regex(
			/[^a-zA-Z0-9]/,
			"A senha deve conter ao menos um caractere especial.",
		),
});

export type SignUpFormSchemaTypes = z.infer<typeof SignUpFormSchema>;

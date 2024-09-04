import z from "zod";

export const SignUpFormSchema = z.object({
	firstName: z
		.string()
		.min(2, "O nome deve conter ao menos 2 caracteres.")
		.max(50),
	lastName: z
		.string()
		.min(2, "O nome deve conter ao menos 2 caracteres.")
		.max(50),
	email: z
		.string({ message: "O email é obrigatório." })
		.email("Formato de email inválido."),
	password: z.string().min(6, "A senha deve conter ao menos 6 caracteres."),
});

export type SignupFormSchemaTypes = z.infer<typeof SignUpFormSchema>;

export const SIGN_UP_FORM_DEFAULT_VALUES: SignupFormSchemaTypes = {
	firstName: "",
	lastName: "",
	email: "",
	password: "",
};

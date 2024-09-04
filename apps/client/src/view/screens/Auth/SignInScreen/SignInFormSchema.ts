import z from "zod";

export const SignInFormSchema = z.object({
	email: z
		.string({ message: "O email é obrigatório." })
		.email("Formato de email inválido."),
	password: z.string().min(6, "A senha deve conter ao menos 6 caracteres."),
});

export type SigninFormSchemaTypes = z.infer<typeof SignInFormSchema>;

export const SIGN_IN_FORM_DEFAULT_VALUES: SigninFormSchemaTypes = {
	email: "",
	password: "",
};

import z from "zod";

export const ConfirmationAccountFormSchema = z.object({
	code: z.string().min(6, {
		message: "O código de verificação precisa ter 6 caracteres.",
	}),
	email: z.string().email({ message: "Email inválido" }),
});

export type ConfirmationAccountFormSchemaTypes = z.infer<
	typeof ConfirmationAccountFormSchema
>;

export const CONFIRMATION_ACCOUNT_FORM_DEFAULT_VALUES: ConfirmationAccountFormSchemaTypes =
	{
		email: "",
		code: "",
	};

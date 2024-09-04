import z from "zod";

const AccountDetailsSchema = z.object({
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
		.string()
		.min(6, "A senha deve conter ao menos 6 caracteres.")
		.regex(/[a-zA-Z]/, "A senha deve conter ao menos uma letra.")
		.regex(/[0-9]/, "A senha deve conter ao menos um número.")
		.regex(
			/[^a-zA-Z0-9]/,
			"A senha deve conter ao menos um caractere especial.",
		),
});

const ResearchSchema = z.object({
	firstAnswer: z.string({ required_error: "A resposta é obrigatória" }),
	secondAnswer: z.string({ required_error: "A resposta é obrigatória" }),
	thirthAnswer: z.string({ required_error: "A resposta é obrigatória" }),
});

export const SignUpFormSchema = z.object({
	currentStep: z.enum([
		"AccountDetailsStep",
		"ConfirmationAccountStep",
		"ResearchStep",
		"WelcomeStep",
	]),
	steps: z.object({
		accountDetails: AccountDetailsSchema,
		researchStep: ResearchSchema,
	}),
});

export type SignupFormSchemaTypes = z.infer<typeof SignUpFormSchema>;

export const SIGN_UP_FORM_DEFAULT_VALUES: SignupFormSchemaTypes = {
	currentStep: "AccountDetailsStep",
	steps: {
		accountDetails: {
			firstName: "",
			lastName: "",
			email: "",
			password: "",
		},
		researchStep: {
			firstAnswer: "",
			secondAnswer: "",
			thirthAnswer: "",
		},
	},
};

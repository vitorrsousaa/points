import z from "zod";

export const AccountDetailsSchema = z.object({
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
	leadInidication: z.enum(
		["indication", "whatsapp", "instagram", "facebook", "google", "other"],
		{
			message: "Incorreto",
		},
	),
	athleteNumber: z.enum(["0-5", "5-25", "25-50", "50-100", "100+"], {
		message: "A resposta é obrigatória",
	}),
	challengers: z
		.string({
			required_error: "A resposta é obrigatória",
		})
		.min(5, "Este campo precisa ter no mínimo 5 caracteres."),
});

export const SignUpFormSchema = z.object({
	userId: z.string(),
	currentStep: z.enum([
		"AccountDetailsStep",
		"ConfirmationAccountStep",
		"ResearchStep",
	]),
	steps: z.object({
		accountDetails: AccountDetailsSchema,
		researchStep: ResearchSchema,
	}),
});

export type SignupFormSchemaTypes = z.infer<typeof SignUpFormSchema>;
export type AccountDetailsStepTypes = z.infer<typeof AccountDetailsSchema>;
export type ResearchStepTypes = z.infer<typeof ResearchSchema>;

export const SIGN_UP_FORM_DEFAULT_VALUES: SignupFormSchemaTypes = {
	userId: "",
	currentStep: "AccountDetailsStep",
	steps: {
		accountDetails: {
			firstName: "",
			lastName: "",
			email: "",
			password: "",
		},
		researchStep: {
			leadInidication: "indication",
			athleteNumber: "0-5",
			challengers: "",
		},
	},
};

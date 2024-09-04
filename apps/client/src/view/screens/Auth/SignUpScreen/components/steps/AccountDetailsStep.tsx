import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
	PasswordInput,
	Separator,
	StepperFooter,
	StepperHeader,
	StepperNextButton,
	useStepper,
} from "@shared/ui";

import { useSignup } from "@/hooks/auth";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { SignupFormSchemaTypes } from "../../SignUpFormSchema";

export function AccountDetailsStep() {
	const { signup } = useSignup();

	const {
		control,
		setValue,
		trigger,
		handleSubmit: hookFormSubmit,
		formState: { isSubmitting, isValidating, errors },
	} = useFormContext<SignupFormSchemaTypes>();

	useEffect(() => console.log(errors), [errors]);

	const { nextStep } = useStepper();

	const handleSubmit = hookFormSubmit(async (data) => {
		const ROLE = ["COACH"];
		const newUser = { ...data.steps.accountDetails, role: ROLE };

		await signup(newUser);
	});

	async function handleClickNextStep() {
		const isValidStep = await trigger("steps.accountDetails");

		if (isValidStep) {
			await handleSubmit();

			setValue("currentStep", "ConfirmationAccountStep");
			nextStep();
		}
	}

	const isLoadingForm = isSubmitting || isValidating;

	return (
		<>
			<StepperHeader
				title="Crie sua conta"
				subtitle="Adicione seu email e escolha uma senha."
			/>

			<div className="flex flex-col gap-4">
				<div className="flex flex-row align-center gap-4">
					<FormField
						control={control}
						name="steps.accountDetails.firstName"
						disabled={isLoadingForm}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Nome</FormLabel>
								<FormControl>
									<Input placeholder="João" {...field} />
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={control}
						name="steps.accountDetails.lastName"
						disabled={isLoadingForm}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Sobrenome</FormLabel>
								<FormControl>
									<Input placeholder="da Silva" {...field} />
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<FormField
					control={control}
					name="steps.accountDetails.email"
					disabled={isLoadingForm}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input placeholder="grypp.contato@exemplo.com" {...field} />
							</FormControl>
							<FormDescription>
								Enviaremos uma confirmação para este email.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={control}
					name="steps.accountDetails.password"
					disabled={isLoadingForm}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Senha</FormLabel>
							<FormControl>
								<PasswordInput placeholder="*******" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>

			<Separator className="mt-8 mb-8" />

			<StepperFooter>
				<StepperNextButton
					onClick={handleClickNextStep}
					isLoading={isLoadingForm}
				/>
			</StepperFooter>
		</>
	);
}

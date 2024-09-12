import { useSignup } from "@/hooks/auth";
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
	PasswordInput,
	RenderIf,
	Separator,
	StepperFooter,
	StepperHeader,
	StepperNextButton,
	useStepper,
} from "@shared/ui";
import { useFormContext } from "react-hook-form";
import toast from "react-hot-toast";
import type {
	AccountDetailsStepTypes,
	SignupFormSchemaTypes,
} from "../../SignUpFormSchema";

export function AccountDetailsStep() {
	const { nextStep } = useStepper();

	const {
		control,
		setValue,
		trigger,
		getValues,
		register,
		formState: { errors },
	} = useFormContext<SignupFormSchemaTypes>();

	const { signup, isCreatingAccount } = useSignup({
		onSuccess: (data, variables) => {
			if (!data || !variables) return;
			setValue("userId", data?.userId);
			setValue("currentStep", "ConfirmationAccountStep");
			setValue("steps.accountDetails.password", variables?.password);

			nextStep();
		},
		onError(error) {
			console.log(error);

			toast.error("Ocorreu um erro ao criar a sua conta.");
		},
	});

	function handleSubmit() {
		const userData: AccountDetailsStepTypes = getValues("steps.accountDetails");

		const ROLE = ["COACH"];
		const newUserData = { ...userData, role: ROLE };

		signup(newUserData);
	}

	async function handleClickNextStep() {
		const isValidStep = await trigger("steps.accountDetails", {
			shouldFocus: true,
		});

		if (isValidStep) {
			handleSubmit();
		}
	}

	const isLoadingForm = isCreatingAccount;

	return (
		<>
			<StepperHeader
				title="Crie sua conta"
				subtitle="Adicione seu e-mail e crie uma senha."
			/>

			<div className="flex flex-col gap-4">
				<div className="flex flex-row align-center gap-4">
					<FormItem className="w-full">
						<FormLabel>Nome</FormLabel>

						<Input
							placeholder="João"
							{...register("steps.accountDetails.firstName")}
						/>

						<RenderIf
							condition={!!errors.steps?.accountDetails?.firstName?.message}
							render={
								<FormMessage>
									{errors.steps?.accountDetails?.firstName?.message}
								</FormMessage>
							}
						/>
					</FormItem>

					<FormItem className="w-full">
						<FormLabel>Sobrenome</FormLabel>
						<FormControl>
							<Input
								placeholder="da Silva"
								{...register("steps.accountDetails.lastName")}
							/>
						</FormControl>

						<RenderIf
							condition={!!errors.steps?.accountDetails?.lastName?.message}
							render={
								<FormMessage>
									{errors.steps?.accountDetails?.lastName?.message}
								</FormMessage>
							}
						/>
					</FormItem>
				</div>

				<FormItem>
					<FormLabel>Email</FormLabel>

					<FormControl>
						<Input
							placeholder="grypp.contato@exemplo.com"
							{...register("steps.accountDetails.email")}
						/>
					</FormControl>

					<RenderIf
						condition={!!errors.steps?.accountDetails?.email?.message}
						render={
							<FormMessage>
								{errors.steps?.accountDetails?.email?.message}
							</FormMessage>
						}
					/>

					<FormDescription>
						Enviaremos uma confirmação para este email.
					</FormDescription>
					<FormMessage />
				</FormItem>

				<FormField
					control={control}
					name="steps.accountDetails.password"
					disabled={isLoadingForm}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Senha</FormLabel>
							<FormControl>
								<PasswordInput
									placeholder="*******"
									showValidation
									{...field}
								/>
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

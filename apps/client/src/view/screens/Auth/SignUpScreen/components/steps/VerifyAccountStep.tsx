import {
	Separator,
	StepperFooter,
	StepperHeader,
	StepperNextButton,
	StepperPreviousButton,
	useStepper,
} from "@shared/ui";
import { useFormContext } from "react-hook-form";
import type { SignupFormSchemaTypes } from "../../SignUpFormSchema";

export function VerifyAccountStep() {
	const { setValue, getValues } = useFormContext<SignupFormSchemaTypes>();

	const { nextStep, previousStep } = useStepper();

	function handleClickPreviousStep() {
		setValue("currentStep", "AccountDetailsStep");

		previousStep();
	}

	function handleClickNextStep() {
		setValue("currentStep", "ResearchStep");

		nextStep();
	}

	return (
		<>
			<StepperHeader
				title="Verifique seu email"
				subtitle={`Enviamos um email de confirmação para sua caixa de entrada - ${getValues("steps.accountDetails.email")}.`}
			/>

			<div className="w-full">
				<small className="font-semibold block mb-2">
					Como o email se parece:
				</small>
				<img
					src="account-confirmation-email-example.png"
					className="rounded-xl bg-gray-300 min-h-[262px] w-full"
					alt="Email de Confirmação de Conta"
					title="Email de Confirmação de Conta"
				/>
			</div>

			<Separator className="mt-8 mb-8" />

			<StepperFooter>
				<StepperPreviousButton onClick={handleClickPreviousStep} />
				<StepperNextButton onClick={handleClickNextStep} />
			</StepperFooter>
		</>
	);
}

import { Icon, StepperLabels } from "@shared/ui";

import { ROUTES } from "@/config/routes";
import { useFormContext } from "react-hook-form";
import { Link } from "react-router-dom";
import { SignupFormSchemaTypes } from "../SignUpFormSchema";

export function SideProgressStepper() {
	const { watch } = useFormContext<SignupFormSchemaTypes>();

	const currentStep = watch("currentStep");

	return (
		<div className="hidden bg-muted lg:flex flex-col p-10">
			<div className="flex flex-1 flex-col gap-6 mt-20">
				<StepperLabels
					labels={[
						{
							title: "Seus detalhes",
							description: "Informe um email e senha",
							icon: "person",
							isActive: currentStep === "AccountDetailsStep",
						},
						{
							title: "Verifique seu email",
							description: "Ative sua conta rapidamente",
							icon: "closedEnvelope",
							isActive: currentStep === "ConfirmationAccountStep",
						},
						{
							title: "Perguntinhas rápidas",
							description: "Queremos conhecer você",
							icon: "questionMark",
							isActive: currentStep === "ResearchStep",
						},
					]}
				/>
			</div>

			<Link
				to={ROUTES.SIGNIN}
				className="font-regular text-center text-sm mt-6 flex items-center gap-2 "
			>
				<Icon name="arrow_left" />
				Voltar ao início
			</Link>
		</div>
	);
}

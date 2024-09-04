import { Stepper } from "@shared/ui";

import { useSignUpScreen } from "./useSignUpScreen";

import { FormProvider } from "react-hook-form";
import {
	AccountDetailsStep,
	ResearchStep,
	SideProgressStepper,
	VerifyAccountStep,
} from "./components";

export function SignUpScreen() {
	const { methods } = useSignUpScreen();

	return (
		<FormProvider {...methods}>
			<SideProgressStepper />

			<form
				id="signup"
				className="flex items-center justify-center py-12 mx-auto w-full sm:w-[460px] gap-6"
			>
				<Stepper
					steps={[
						{
							content: <AccountDetailsStep />,
						},
						{
							content: <VerifyAccountStep />,
						},
						{
							content: <ResearchStep />,
						},
					]}
				/>
			</form>
		</FormProvider>
	);
}

import { Stepper } from "@shared/ui";

import { DevTool } from "@hookform/devtools";
import { FormProvider } from "react-hook-form";
import {
	AccountDetailsStep,
	ResearchStep,
	SideProgressStepper,
	VerifyAccountStep,
} from "./components";
import { useSignUpScreen } from "./useSignUpScreen";

export function SignUpScreen() {
	const { form, handleClickFinishForm } = useSignUpScreen();

	return (
		<FormProvider {...form}>
			<SideProgressStepper />

			<form
				id="signup"
				onSubmit={handleClickFinishForm}
				className="flex items-center justify-center py-12 mx-auto w-full sm:w-[460px] gap-6"
			>
				<DevTool control={form.control} />
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

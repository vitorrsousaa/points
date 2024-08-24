import { useGetSettings } from "@/hooks/settings";
import { useMemo } from "react";

export function useOnboarding() {
	const { settings, isLoading, isError } = useGetSettings();

	const onboardingData = useMemo(() => {
		if (isLoading || !settings) {
			return null;
		}

		const steps = Object.entries(settings.onboarding.steps).map(
			([key, value]) => ({ [key]: value }),
		);

		const completedSteps = Object.entries(settings.onboarding.steps)
			.filter(([_, value]) => value.status === "completed")
			.map(([key, value]) => ({ [key]: value }));

		return {
			...settings.onboarding,
			steps,
			completedSteps,
			isCompleted: steps.length === completedSteps.length,
		};
	}, [settings, isLoading]);

	return {
		settings,
		isLoading,
		isError,
		onboardingData,
	};
}

export type StepStatus = "pending" | "completed";

export interface Settings {
	id: string;
	userId: string;
	createdAt: string;
	updatedAt: string;
	onboarding: {
		enable?: boolean;
		steps: {
			stepOne?: {
				status: StepStatus;
			};
			stepTwo?: {
				status: StepStatus;
			};
		};
	};
	preferencesEmail: {
		createWorkoutReview: boolean;
	};
}

export type StepStatus = "pending" | "completed";

export type Settings = {
	id: string;
	createdAt: string;
	updatedAt: string;
	userId: string;
	onboarding: {
		enable: boolean;
		steps: {
			stepOne: {
				status: StepStatus;
			};
			stepTwo: {
				status: StepStatus;
			};
		};
	};
};

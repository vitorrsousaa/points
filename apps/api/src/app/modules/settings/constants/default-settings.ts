import type { Settings } from "@core/domain/settings";

export const defaultSettings: Omit<
	Settings,
	"id" | "userId" | "createdAt" | "updatedAt"
> = {
	onboarding: {
		enable: true,
		steps: {
			stepOne: {
				status: "pending",
			},
			stepTwo: {
				status: "pending",
			},
		},
	},
};

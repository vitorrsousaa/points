import * as z from "zod";

export const StepStatusSchema = z.enum(["pending", "completed"]);

export type StepStatus = z.infer<typeof StepStatusSchema>;

export const SettingsSchema = z.object({
	id: z.string().uuid(),
	createdAt: z.string(),
	updatedAt: z.string(),
	userId: z.string().uuid(),
	onboarding: z.object({
		enable: z.boolean(),
		steps: z.object({
			stepOne: z.object({
				status: StepStatusSchema,
			}),
			stepTwo: z.object({
				status: StepStatusSchema,
			}),
		}),
	}),
	email: z.object({
		createWorkoutReview: z.boolean(),
	}),
});

export type Settings = z.infer<typeof SettingsSchema>;

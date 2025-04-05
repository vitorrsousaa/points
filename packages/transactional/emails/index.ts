import { render } from "@react-email/components";
import { CreateWorkoutReview } from "./create-workout-review";

export const TEMPLATES = [
	{
		label: "Create Workout Review",
		value: "create-workout-review",
		component: CreateWorkoutReview,
	},
] as const;

export type TemplatesIds = (typeof TEMPLATES)[number]["value"];

export * from "./create-workout-review";
export * from "./vercel-invite-user";
export { render };

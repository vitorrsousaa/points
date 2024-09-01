import type { Prettify } from "@application/utils/types";
import type { BaseEntity } from "../base";
/**
 * Athlete domain model
 */
export type Athlete = Prettify<
	BaseEntity & {
		coachId: string;
		weight: number;
		height: number;
		age: number;
		name: string;
		email: string;
		workoutCount: number;
		isActive: boolean;
	}
>;

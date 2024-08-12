import type { Prettify } from "@application/utils/types";
import type { User } from "../user";
/**
 * Athlete domain model
 */
export type Athlete = Prettify<
	User & {
		coachId: string;
		weight: number;
		height: number;
		age: number;
	}
>;

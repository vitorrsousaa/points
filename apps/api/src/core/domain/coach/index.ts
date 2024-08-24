import type { Prettify } from "@application/utils/types";
import type { BaseEntity } from "../base";

export type Coach = Prettify<
	BaseEntity & {
		name: string;
	}
>;

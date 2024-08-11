import type { Exercise } from "../exercise";

export type Training = {
	name: string;
	id: string;
	exercises: Exercise[];
};

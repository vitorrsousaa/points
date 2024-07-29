import { AppError } from "@application/errors/app-error";

export class CoachIsRequired extends AppError {
	constructor() {
		super("Coach is required", 422);
	}
}

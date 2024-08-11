import { AppError } from "@application/errors/app-error";

export class CoachNotFound extends AppError {
	constructor() {
		super("Coach not found", 404);
	}
}

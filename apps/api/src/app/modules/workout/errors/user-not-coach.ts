import { AppError } from "@application/errors/app-error";

export class UserShouldBeCoach extends AppError {
	constructor() {
		super("User should be coach", 404);
	}
}

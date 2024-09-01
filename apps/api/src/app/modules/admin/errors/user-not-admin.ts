import { AppError } from "@application/errors/app-error";

export class UserNotAdmin extends AppError {
	constructor() {
		super("User not Admin", 401);
	}
}

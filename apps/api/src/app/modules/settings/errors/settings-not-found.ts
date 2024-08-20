import { AppError } from "@application/errors/app-error";

export class SettingsNotFound extends AppError {
	constructor() {
		super("Settings Not Found", 404);
	}
}

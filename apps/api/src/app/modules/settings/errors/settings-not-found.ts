import { AppError } from "@application/errors/app-error";

export class SettingsNotFound extends AppError {
	constructor() {
		super("Settings not found", 404);
	}
}

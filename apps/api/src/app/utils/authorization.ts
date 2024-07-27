import { AppError } from "@application/errors/app-error";

export function authorization(userId: string | null) {
	if (!userId) throw new AppError("Unauthorized", 401);

	return userId;
}

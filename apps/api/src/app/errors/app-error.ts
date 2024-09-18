type TypeOptions =
	| "USERNAME_EXISTS"
	| "CODE_DELIVERY_FAILURE"
	| "USER_NOT_CONFIRMED"
	| "PASSWORD_RESET_REQUIRED"
	| "CODE_MISMATCH"
	| "ALIAS_EXISTS"
	| "EXPIRED_CODE"
	| "USER_NOT_FOUND"
	| "INVALID_CREDENTIALS"
	| "INVALID_PARAMETER"
	| "INTERNAL_SERVER_ERROR";

export class AppError {
	constructor(
		public readonly message: string,
		public readonly statusCode: number,
		public readonly type: TypeOptions = "INTERNAL_SERVER_ERROR",
	) {
		this.message = message;
		this.statusCode = statusCode;
		this.type = type;
	}
}

import { accountConfirmation } from "./account-confirmation";
import { forgotPassword } from "./forgot-password";
import { resendCode } from "./resend-code";
import { resetPassword } from "./reset-password";
import { signin } from "./signin";
import { signup } from "./signup";

export const authService = {
	signup,
	signin,
	accountConfirmation,
	forgotPassword,
	resendCode,
	resetPassword,
};

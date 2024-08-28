import { ResendCodeController } from "@application/modules/auth/controllers/resendCode";
import { makeResendCodeService } from "@factories/services/auth/resendCode";

export function makeResendCodeController() {
	return new ResendCodeController(makeResendCodeService());
}

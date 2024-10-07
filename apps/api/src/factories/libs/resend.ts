import { makeConfigEnvironment } from "@factories/config/environment";
import { Resend } from "resend";

export function makeResendClient() {
	const config = makeConfigEnvironment();

	return new Resend(config.RESEND_API_KEY);
}

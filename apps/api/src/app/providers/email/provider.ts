import type { IResendClient } from "@application/libs/resend";
import type {
	IEmailProvider,
	SendEmailOptions,
	SendEmailResponse,
} from "./types";

export class EmailProvider implements IEmailProvider {
	private INTERNAL_EMAIL = "suporte@grypp.com.br";

	constructor(private readonly resendClient: IResendClient) {}

	async send(options: SendEmailOptions): Promise<SendEmailResponse> {
		const { to, subject, text, react } = options;

		return this.resendClient.emails.send({
			from: this.INTERNAL_EMAIL,
			to,
			subject,
			react,
			text,
		});
	}
}

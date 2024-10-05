import type { IResendClient } from "@application/libs/resend";
import { render as renderReactComponent } from "@react-email/components";
import React from "react";
import type {
	IEmailProvider,
	SendEmailOptions,
	SendEmailResponse,
} from "./types";

export class EmailProvider implements IEmailProvider {
	// private INTERNAL_EMAIL = "onboarding@resend.dev";
	private INTERNAL_EMAIL = "suporte@grypp.com.br";

	constructor(private readonly resendClient: IResendClient) {}
	async render<
		T extends
			| keyof JSX.IntrinsicElements
			| React.JSXElementConstructor<unknown>,
	>(component: T, props: React.ComponentProps<T>): Promise<string> {
		return renderReactComponent(React.createElement(component, props));
	}

	async send(options: SendEmailOptions): Promise<SendEmailResponse> {
		const { to, subject, text, react, html } = options;

		return this.resendClient.emails.send({
			from: this.INTERNAL_EMAIL,
			to,
			subject,
			react,
			text,
			html,
		});
	}
}

// HOW TO USE

// const emailHtml = await this.emailProvider.render(VercelInviteUserEmail, { username: 'Jonas' });

// const response = await this.emailProvider.send({
//   to: 'gryppfit@gmail.com',
//   subject: "Login realizado com sucesso",
//   html: emailHtml
// })

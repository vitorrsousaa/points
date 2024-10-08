import type React from "react";

export type SendEmailOptions = {
	to: string;
	subject: string;
	text?: string;
	react?: string;
	html?: string;
};

export type SendEmailResponse = {
	data: { id: string } | null;
	error: {
		message: string;
		name: string;
	} | null;
};

export type RenderFunction = <T>(
	component: React.JSXElementConstructor<T>,
	props: T,
) => Promise<string>;

export interface IEmailProvider {
	send(options: SendEmailOptions): Promise<SendEmailResponse>;
	render: RenderFunction;
}

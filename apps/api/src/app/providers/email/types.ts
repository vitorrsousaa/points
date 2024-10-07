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

export type RenderFunction = <
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	T extends keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>,
>(
	component: T,
	props: React.ComponentProps<T>,
) => Promise<string>;

export interface IEmailProvider {
	send(options: SendEmailOptions): Promise<SendEmailResponse>;
	render: RenderFunction;
}

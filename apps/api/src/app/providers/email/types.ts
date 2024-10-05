export type SendEmailOptions = {
	to: string;
	subject: string;
	text?: string;
	react?: string;
};

export type SendEmailResponse = {
	data: { id: string } | null;
	error: {
		message: string;
		name: string;
	} | null;
};

export interface IEmailProvider {
	send(options: SendEmailOptions): Promise<SendEmailResponse>;
}

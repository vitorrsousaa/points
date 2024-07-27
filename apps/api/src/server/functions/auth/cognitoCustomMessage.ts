import type { CustomMessageTriggerEvent } from "aws-lambda";

export async function handler(event: CustomMessageTriggerEvent) {
	if (event.triggerSource === "CustomMessage_SignUp") {
		const name = event.request.userAttributes.given_name;
		const codeParameter = event.request.codeParameter;
		event.response.emailSubject = "Confirme a sua conta";

		event.response.emailMessage = `Olá, ${name}! Obrigado por se cadastrar em nossa plataforma. Para confirmar sua conta, utilize o código a seguir: ${codeParameter}`;

		// const email = event.request.userAttributes.email;
		// Acesse: https://app.seuapp.com.br/reset/?email=${encodeURIComponent(email)}&code=${codeParameter}
	}

	return event;
}

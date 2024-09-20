import type { CustomMessageTriggerEvent } from "aws-lambda";

export async function handler(event: CustomMessageTriggerEvent) {
	if (
		event.triggerSource === "CustomMessage_ForgotPassword" ||
		event.triggerSource === "CustomMessage_ResendCode"
	) {
		const codeParameter = event.request.codeParameter;

		event.response.emailSubject = "Seu código de confirmação - GRYPP";
		event.response.emailMessage = `
			<html>
				<body
					style="background-color:#fff; font-family: Inter,PT Sans,Trebuchet MS,sans-serif;">
					<div
						style="margin: 0 auto; width: 600px; padding: 42px 16px 0; background-color: #fff;"
						align="center">
						<div style="max-width: 480px; margin: 0 auto;">
							<p
								style="font-size: 1rem; line-height: 24px; color: #EA580C; text-align: center; display: block; margin-bottom: 8px; font-weight: 600;">
								Código de Confirmação
							</p>

							<p
								style="margin-top: 8px; font-size: 16px; line-height: 24px; color: #667085; text-align: center;">
								Utilize o código abaixo para ativar sua conta. <br/> Caso tenha dúvidas, entre em contato com nosso suporte.
							</p>

							<div style="background-color: #F7F7F7; max-width: 320px; padding: 8px; margin-top: 24px; border-radius: 8px;">
								<p style="font-size: 1rem; line-height: 24px; color: #101828; text-align: center; font-weight: 600;">
									Seu código:
								</p>
								<p style="font-size: 20px; line-height: 32px; color: #EA580C; text-align: center; font-weight: bold;">
									${codeParameter}
								</p>
							</div>
						</div>
					</div>
				</body>
			</html>
		`;
	}

	if (
		event.triggerSource === "CustomMessage_SignUp" ||
		event.triggerSource === "CustomMessage_ResendCode"
	) {
		const name = event.request.userAttributes.given_name;
		const email = event.request.userAttributes.email;
		const codeParameter = event.request.codeParameter;
		event.response.emailSubject = "Confirme a sua conta - GRYPP";

		event.response.emailMessage = `
			<html>
				<body
					style="background-color:#fff; font-family: Inter,PT Sans,Trebuchet MS,sans-serif; ">
					<div
						style="margin: 0 auto; width: 600px; padding: 42 16 0; background-color: #fff;"
						align="center">
						<div>
							<p
								style="font-size: 1rem; line-height: 24px; color: #EA580C; text-align: center; display: block; margin-bottom: 8px; font-weight: 600;">Boas-vindas</p>
							<h2
								style="font-size: 28px; margin-bottom: 8px; font-style: normal; font-weight: bold; color: #101828; line-height: 36px; text-align: center;">Olá,
								${name}! <br />
							</h2>
							<p
								style="margin-top: 8px;font-size: 16px; line-height: 24px; color: #667085; text-align: center;">
								Estamos muito felizes de contar com você, ative sua conta e disfrute
								as vantagens que temos para você
							</p>
							<div style="margin-left: 24px;margin-right: 20px;margin-top: 24px;">
								<div style="text-align: center;">
									<a
										style="border-radius: 8px; max-width: 407px; margin: 0 auto; display: block; font-size: 18px; font-weight: 600;line-height: 24px;padding: 12px 24px 12px 24px; text-align: center;text-decoration: none !important;transition: opacity 0.1s ease-in;color: #ffffff !important; ;background-color: #EA580C;font-family: Inter, PT Sans, Trebuchet MS, sans-serif; letter-spacing: 0.05rem;"
										href="https://app.grypp.com.br/verificacao/?email=${encodeURIComponent(email)}&code=${codeParameter}">
										CLIQUE AQUI PARA ATIVAR SUA CONTA
									</a>
								</div>
							</div>
						</div>

						<div style="margin-top: 60px; margin-bottom: 60px;">
							<div style="margin-bottom: 36px; text-align: left;">
								<h2>Nossas vantagens</h2>
								<span style="font-size: 16px; line-height: 24px; color: #667085; font-weight: 500;">
									Experience contemporary bliss with our sleek and cozy furniture collection, designed for optimal comfort and style
								</span>
							</div>
				
							<table style="width: 100%; border-collapse: collapse;">
								<tr>
									<td style="padding: 10px; text-align: center;">
										<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
											<g clip-path="url(#clip0_15697_2247)">
											<rect width="24" height="24" rx="12" fill="#FDEFE7"/>
											<path fill-rule="evenodd" clip-rule="evenodd" d="M17.096 7.38967L9.93602 14.2997L8.03602 12.2697C7.68602 11.9397 7.13602 11.9197 6.73602 12.1997C6.34602 12.4897 6.23602 12.9997 6.47602 13.4097L8.72602 17.0697C8.94602 17.4097 9.32601 17.6197 9.75601 17.6197C10.166 17.6197 10.556 17.4097 10.776 17.0697C11.136 16.5997 18.006 8.40967 18.006 8.40967C18.906 7.48967 17.816 6.67967 17.096 7.37967V7.38967Z" fill="#EA580C"/>
											</g>
											<defs>
											<clipPath id="clip0_15697_2247">
											<rect width="24" height="24" rx="12" fill="white"/>
											</clipPath>
											</defs>
										</svg>
										<h3 style="font-size: 20px; font-weight: 600; line-height: 28px; color: #101828; margin-bottom: 8px;">Esqueça planilhas</h3>
										<span style="font-size: 16px; line-height: 24px; color: #667085; font-weight: 500;">Indulge in the enduring beauty of our furniture pieces, crafted with exquisite attention to detail and timeless design</span>
									</td>

									<td style="padding: 10px; text-align: center;">
										<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
											<g clip-path="url(#clip0_15697_2247)">
											<rect width="24" height="24" rx="12" fill="#FDEFE7"/>
											<path fill-rule="evenodd" clip-rule="evenodd" d="M17.096 7.38967L9.93602 14.2997L8.03602 12.2697C7.68602 11.9397 7.13602 11.9197 6.73602 12.1997C6.34602 12.4897 6.23602 12.9997 6.47602 13.4097L8.72602 17.0697C8.94602 17.4097 9.32601 17.6197 9.75601 17.6197C10.166 17.6197 10.556 17.4097 10.776 17.0697C11.136 16.5997 18.006 8.40967 18.006 8.40967C18.906 7.48967 17.816 6.67967 17.096 7.37967V7.38967Z" fill="#EA580C"/>
											</g>
											<defs>
											<clipPath id="clip0_15697_2247">
											<rect width="24" height="24" rx="12" fill="white"/>
											</clipPath>
											</defs>
										</svg>

										<h3 style="font-size: 20px; font-weight: 600; line-height: 28px; color: #101828; margin-bottom: 8px;">Cuidado com o aluno</h3>
										<span style="font-size: 16px; line-height: 24px; color: #667085; font-weight: 500;">Indulge in the enduring beauty of our furniture pieces, crafted with exquisite attention to detail and timeless design</span>
									</td>
								</tr>
								<tr>
									<td style="padding: 32px 10px 10px; text-align: center;">
										<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
											<g clip-path="url(#clip0_15697_2247)">
											<rect width="24" height="24" rx="12" fill="#FDEFE7"/>
											<path fill-rule="evenodd" clip-rule="evenodd" d="M17.096 7.38967L9.93602 14.2997L8.03602 12.2697C7.68602 11.9397 7.13602 11.9197 6.73602 12.1997C6.34602 12.4897 6.23602 12.9997 6.47602 13.4097L8.72602 17.0697C8.94602 17.4097 9.32601 17.6197 9.75601 17.6197C10.166 17.6197 10.556 17.4097 10.776 17.0697C11.136 16.5997 18.006 8.40967 18.006 8.40967C18.906 7.48967 17.816 6.67967 17.096 7.37967V7.38967Z" fill="#EA580C"/>
											</g>
											<defs>
											<clipPath id="clip0_15697_2247">
											<rect width="24" height="24" rx="12" fill="white"/>
											</clipPath>
											</defs>
										</svg>

										<h3 style="font-size: 20px; font-weight: 600; line-height: 28px; color: #101828; margin-bottom: 8px;">Treinos facilitados</h3>
										<span style="font-size: 16px; line-height: 24px; color: #667085; font-weight: 500;">Indulge in the enduring beauty of our furniture pieces, crafted with exquisite attention to detail and timeless design</span>
									</td>
									
									<td style="padding: 32px 10px 10px; text-align: center;">
										<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
											<g clip-path="url(#clip0_15697_2247)">
											<rect width="24" height="24" rx="12" fill="#FDEFE7"/>
											<path fill-rule="evenodd" clip-rule="evenodd" d="M17.096 7.38967L9.93602 14.2997L8.03602 12.2697C7.68602 11.9397 7.13602 11.9197 6.73602 12.1997C6.34602 12.4897 6.23602 12.9997 6.47602 13.4097L8.72602 17.0697C8.94602 17.4097 9.32601 17.6197 9.75601 17.6197C10.166 17.6197 10.556 17.4097 10.776 17.0697C11.136 16.5997 18.006 8.40967 18.006 8.40967C18.906 7.48967 17.816 6.67967 17.096 7.37967V7.38967Z" fill="#EA580C"/>
											</g>
											<defs>
											<clipPath id="clip0_15697_2247">
											<rect width="24" height="24" rx="12" fill="white"/>
											</clipPath>
											</defs>
										</svg>

										<h3 style="font-size: 20px; font-weight: 600; line-height: 28px; color: #101828; margin-bottom: 8px;">Mais tempo para você</h3>
										<span style="font-size: 16px; line-height: 24px; color: #667085; font-weight: 500;">Indulge in the enduring beauty of our furniture pieces, crafted with exquisite attention to detail and timeless design</span>
									</td>
								</tr>
							</table>

						</div>
					</div>

				</body>
			</html>
		`;

		// const email = event.request.userAttributes.email;
		// Acesse: https://app.seuapp.com.br/reset/?email=${encodeURIComponent(email)}&code=${codeParameter}
	}

	return event;
}

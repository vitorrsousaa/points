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

							<div style="background-color: rgba(234, 234, 234, 30%); max-width: 320px; padding: 8px; margin-top: 24px; border-radius: 8px;">
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
				<body style="background-color:#fff; font-family: Inter, PT Sans, Trebuchet MS, sans-serif;">
					<div style="text-align: center; padding: 24px;">
						<svg width="131" height="41" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#a)"><path d="M16.6434 4.30469V14.5907c0 2.269-2.782 3.3614-4.3259 1.6987L5.8252 9.29772M33.2869 20.9481h-10.286c-2.269 0-3.3615-2.782-1.6987-4.3259l6.9917-6.4923M16.6434 37.5916v-10.286c0-2.269 2.7821-3.3615 4.326-1.6987l6.4923 6.9916M0 20.9481h10.286c2.269 0 3.3615 2.7821 1.6987 4.326l-6.99167 6.4923" stroke="#1E1E1E" stroke-width="3.8865"/></g><path d="M57.1403 17.1764c-.1391-.4836-.3346-.9109-.5863-1.2818-.2517-.3776-.5598-.6956-.9241-.954-.3578-.265-.7685-.467-1.2322-.6062-.4571-.1391-.9639-.2086-1.5204-.2086-1.0401 0-1.9543.2583-2.7426.7751-.7818.5167-1.3912 1.2686-1.8285 2.2557-.4372.9804-.6558 2.1795-.6558 3.5972s.2153 2.6234.6459 3.6171c.4306.9937 1.0401 1.7522 1.8284 2.2756.7884.5167 1.7191.7751 2.7923.7751.9739 0 1.8053-.1723 2.4942-.5168.6956-.3511 1.2256-.8446 1.59-1.4806.371-.636.5564-1.3879.5564-2.2557l.8745.1292h-5.2468v-3.2395h8.5161v2.5638c0 1.7886-.3776 3.3256-1.1328 4.6108-.7552 1.2785-1.7953 2.2656-3.1203 2.9612-1.3249.689-2.842 1.0335-4.5511 1.0335-1.908 0-3.584-.4207-5.0282-1.2621-1.4442-.8479-2.5704-2.0503-3.3786-3.6071-.8016-1.5634-1.2024-3.4184-1.2024-5.5648 0-1.6495.2385-3.1202.7155-4.412.4836-1.2985 1.1593-2.3982 2.0271-3.2991.8679-.901 1.8782-1.5866 3.0309-2.057 1.1527-.4704 2.4014-.7055 3.7462-.7055 1.1527 0 2.2259.1689 3.2196.5068.9937.3312 1.8748.8016 2.6433 1.411.7751.6095 1.4077 1.3349 1.898 2.1762.4902.8348.8049 1.7556.944 2.7625h-4.3723Zm6.1142 13.7728V10.5981h8.0291c1.5369 0 2.8486.2749 3.9351.8248 1.0931.5432 1.9245 1.315 2.4942 2.3153.5763.9937.8645 2.163.8645 3.5078 0 1.3514-.2915 2.5141-.8744 3.4879-.583.9672-1.4277 1.7092-2.534 2.2259-1.0997.5167-2.4313.7751-3.9947.7751h-5.3759v-3.4581h4.6803c.8215 0 1.5038-.1126 2.047-.3378.5433-.2253.9474-.5632 1.2124-1.0136.2716-.4505.4074-1.0103.4074-1.6794 0-.6757-.1358-1.2454-.4074-1.7092-.265-.4637-.6724-.8148-1.2223-1.0533-.5432-.2451-1.2289-.3677-2.057-.3677h-2.9016v16.8334h-4.3027Zm10.9904-9.2613 5.0579 9.2613h-4.7499l-4.9487-9.2613h4.6407Zm3.6547-11.0898h4.8195l4.6406 8.7645h.1987l4.6406-8.7645h4.8195l-7.423 13.1567v7.1944h-4.2729v-7.1944l-7.423-13.1567Zm19.7901 20.3511V10.5981h8.0293c1.543 0 2.858.2948 3.945.8844 1.086.583 1.914 1.3945 2.484 2.4346.576 1.0334.865 2.2259.865 3.5773 0 1.3515-.292 2.5439-.875 3.5774-.583 1.0334-1.427 1.8383-2.534 2.4147-1.099.5763-2.431.8645-3.994.8645h-5.118v-3.4482h4.422c.828 0 1.51-.1424 2.047-.4272.543-.2915.947-.6923 1.212-1.2024.272-.5168.408-1.1097.408-1.7788 0-.6757-.136-1.2653-.408-1.7688-.265-.5101-.669-.9042-1.212-1.1825-.543-.2848-1.232-.4273-2.067-.4273h-2.902v16.8334h-4.3023Zm16.4383 0V10.5981h8.03c1.543 0 2.858.2948 3.945.8844 1.086.583 1.914 1.3945 2.484 2.4346.576 1.0334.864 2.2259.864 3.5773 0 1.3515-.291 2.5439-.874 3.5774-.583 1.0334-1.428 1.8383-2.534 2.4147-1.1.5763-2.431.8645-3.995.8645h-5.117v-3.4482h4.422c.828 0 1.51-.1424 2.047-.4272.543-.2915.947-.6923 1.212-1.2024.272-.5168.407-1.1097.407-1.7788 0-.6757-.135-1.2653-.407-1.7688-.265-.5101-.669-.9042-1.212-1.1825-.543-.2848-1.232-.4273-2.067-.4273h-2.902v16.8334h-4.303Z" fill="#1E1E1E"/><defs><clipPath id="a"><path fill="#fff" transform="translate(0 .976562)" d="M0 0h33.2869v39.9443H0z"/></clipPath></defs></svg>
					</div>

					<div style="margin: 0 auto; width: 600px; padding: 32px 36px 0; background-color: #fff; border-top: 1px solid #D9D9D9;" align="center">
						<div>
							<p style="font-size: 16px; line-height: 24px; color: #EA580C; text-align: center; display: block; margin-bottom: 8px; font-weight: 600; margin-top: 0;">Boas-vindas</p>
							<h2 style="font-size: 28px; font-style: normal; font-weight: bold; color: #333333; line-height: 36px; text-align: center;">Olá, ${name} <br /></h2>
							<p style="margin-top: 8px;font-size: 14px; line-height: 24px; color: #727272; text-align: center;">
								Estamos muito felizes de contar com você, ative sua conta e desfrute as vantagens que temos para você.
							</p>
							<div style="margin-left: 24px;margin-right: 20px;margin-top: 24px;">
								<div style="text-align: center;">
									<a style="border-radius: 8px; max-width: 407px; margin: 0 auto; display: block; font-size: 18px; font-weight: 600; line-height: 24px; padding: 12px 24px; text-align: center; text-decoration: none !important; transition: opacity 0.1s ease-in; color: #ffffff !important; background-color: #EA580C; font-family: Inter, PT Sans, Trebuchet MS, sans-serif; letter-spacing: 0.05rem;"
										href="https://app.grypp.com.br/verificacao/?email=${encodeURIComponent(email)}&code=${codeParameter}">
										Clique aqui e ative sua conta
									</a>
								</div>
							</div>
						</div>

						<div style="margin-top: 36px; margin-bottom: 36px; border-top: 1px solid #D9D9D9;">
							<div style="margin-bottom: 36px; text-align: center;">
								<h2 style="color: #333333; font-size: 24px; line-height: 36px; display: block; text-align: center; margin-bottom: 8px;">O que te oferecemos?</h2>
								<span style="font-size: 14px; line-height: 24px; color: #727272; font-weight: 400;">
									Desfrute de uma experiência completa com nossos produtos, pensados para garantir praticidade no seu dia a dia.
								</span>
							</div>

							<table style="width: 100%; border-collapse: collapse;">
									<tr>
															<td width="48%" valign="top" style="background-color: rgba(234, 234, 234, 30%); padding: 16px; border-radius: 5px; margin-bottom: 10px; box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);">
																	<h3 style="font-size: 18px; color: #333; margin-bottom: 10px;">Esqueça planilhas</h3>
																	<p style="font-size: 16px; line-height: 24px; color: #979DAD;">Personalize seus treinos sem precisar de planilhas, de forma simples e eficiente.</p>
															</td>
															<td width="4%"></td>
															<td width="48%" valign="top" style="background-color: rgba(234, 234, 234, 30%); padding: 16px; border-radius: 5px; margin-bottom: 10px; box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);">
																	<h3 style="font-size: 18px; color: #333; margin-bottom: 10px;">Cuidado com o aluno</h3>
																	<p style="font-size: 16px; line-height: 24px; color: #979DAD;">Combine funcionalidades e praticidade, facilitando seu dia a dia e otimizando o acompanhamento de cada aluno.</p>
															</td>
													</tr>
											
													<!-- Espaçamento entre as linhas -->
													<tr>
															<td colspan="4" style="height: 24px;"></td>
													</tr>
											
													<tr>
															<td width="48%" valign="top" style="background-color: rgba(234, 234, 234, 30%); padding: 16px; border-radius: 5px; margin-bottom: 10px; box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);">
																	<h3 style="font-size: 18px; color: #333; margin-bottom: 10px;">Treinos facilitados</h3>
																	<p style="font-size: 16px; line-height: 24px; color: #979DAD;">Adapte os treinos conforme as necessidades com nossas opções altamente customizáveis.</p>
															</td>
															<td width="4%"></td>
															<td width="48%" valign="top" style="background-color: rgba(234, 234, 234, 30%); padding: 16px; border-radius: 5px; margin-bottom: 10px; box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);">
																	<h3 style="font-size: 18px; color: #333; margin-bottom: 10px;">Mais tempo para você</h3>
																	<p style="font-size: 16px; line-height: 24px; color: #979DAD;">Relaxe enquanto nós cuidamos dos detalhes tendo mais tempo para o que realmente importa, você!</p>
															</td>
													</tr>
							</table>
						</div>
						
							<div style="text-align: center; padding: 24px; background: #FAFAFC; border-top: 1px solid #D9D9D9;">
											<a href="https://www.instagram.com/grypp.app" style="text-decoration: none;">
													<div style="display: block; margin-bottom: 8px;">
															<svg width="24" height="25" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#a)" fill="#333"><path d="M12 3.01641c3.2063 0 3.5859.01406 4.8469.07031 1.1719.05156 1.8047.24844 2.2265.4125.5579.21562.961.47812 1.3782.89531.4218.42188.6797.82031.8953 1.37813.164.42187.3609 1.05937.4125 2.22656.0562 1.26562.0703 1.64531.0703 4.84688 0 3.2062-.0141 3.5859-.0703 4.8469-.0516 1.1718-.2485 1.8047-.4125 2.2265-.2156.5578-.4781.961-.8953 1.3782-.4219.4218-.8203.6796-1.3782.8953-.4218.164-1.0593.3609-2.2265.4125-1.2656.0562-1.6453.0703-4.8469.0703-3.20625 0-3.58594-.0141-4.84687-.0703-1.17188-.0516-1.80469-.2485-2.22657-.4125-.55781-.2157-.96093-.4782-1.37812-.8953-.42188-.4219-.67969-.8204-.89531-1.3782-.16407-.4218-.36094-1.0593-.4125-2.2265-.05625-1.2657-.07032-1.6453-.07032-4.8469 0-3.20626.01407-3.58594.07032-4.84688.05156-1.17188.24843-1.80469.4125-2.22656.21562-.55782.47812-.96094.89531-1.37813.42187-.42187.82031-.67969 1.37812-.89531.42188-.16406 1.05938-.36094 2.22657-.4125C8.41406 3.03047 8.79375 3.01641 12 3.01641Zm0-2.160941c-3.25781 0-3.66562.014062-4.94531.070312-1.275.05625-2.15156.262499-2.91094.557809-.79219.30938-1.4625.71719-2.12812 1.3875C1.34531 3.53672.9375 4.20703.628125 4.99453.332812 5.75859.126563 6.63047.0703125 7.90547.0140625 9.18984 0 9.59766 0 12.8555c0 3.2578.0140625 3.6656.0703125 4.9453.0562505 1.275.2624995 2.1515.5578125 2.9109.309375.7922.717185 1.4625 1.387505 2.1281.66562.6657 1.33593 1.0782 2.12343 1.3829.76407.2953 1.63594.5015 2.91094.5578 1.27969.0562 1.6875.0703 4.9453.0703 3.2578 0 3.6656-.0141 4.9453-.0703 1.275-.0563 2.1516-.2625 2.911-.5578.7875-.3047 1.4578-.7172 2.1234-1.3829.6656-.6656 1.0781-1.3359 1.3828-2.1234.2953-.7641.5016-1.6359.5578-2.9109.0563-1.2797.0703-1.6875.0703-4.9453 0-3.25786-.014-3.66567-.0703-4.94536-.0562-1.275-.2625-2.15156-.5578-2.91093-.2953-.79688-.7031-1.46719-1.3734-2.13282-.6656-.66562-1.336-1.07812-2.1235-1.38281-.764-.29531-1.6359-.501561-2.9109-.557811-1.2844-.060938-1.6922-.075-4.95-.075Z"/><path d="M12 6.69141c-3.40312 0-6.16406 2.76093-6.16406 6.16409 0 3.4031 2.76094 6.164 6.16406 6.164 3.4031 0 6.1641-2.7609 6.1641-6.164 0-3.40316-2.761-6.16409-6.1641-6.16409Zm0 10.16249c-2.20781 0-3.99844-1.7906-3.99844-3.9984S9.79219 8.85703 12 8.85703c2.2078 0 3.9984 1.79067 3.9984 3.99847S14.2078 16.8539 12 16.8539ZM19.8469 6.44688c0 .79687-.6469 1.43906-1.4391 1.43906-.7969 0-1.439-.64687-1.439-1.43906 0-.79688.6468-1.43907 1.439-1.43907s1.4391.64688 1.4391 1.43907Z"/></g><defs><clipPath id="a"><path fill="#fff" transform="translate(0 .855469)" d="M0 0h24v24H0z"/></clipPath></defs></svg>
													</div>

										<span style="color: #333333;">GRYPP</span>
											</a>
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

"use client";

import { Icon } from "@shared/ui";

export function Faq() {
	return (
		<>
			{/**<!-- FAQ --> */}
			<div className="mx-auto max-w-[85rem] px-4 sm:px-6 lg:px-8" id="duvidas">
				{/**<!-- Title --> */}
				<div className="mx-auto mb-10 max-w-2xl lg:mb-14">
					<span className="font-medium mb-6 block bg-gradient-to-tl from-primary to-orange-600 bg-clip-text text-transparent text-center">
						FAQ
					</span>

					<h2 className="text-5xl font-semibold dark:text-white md:text-4xl md:leading-tight text-center">
						Dúvidas frequentes
					</h2>
				</div>
				{/**<!-- End Title --> */}

				<div className="mx-auto max-w-2xl divide-y divide-gray-200 dark:divide-gray-700">
					<div className="py-8 first:pt-0 last:pb-0">
						<div className="flex gap-x-5">
							<div>
								<Icon
									name="questionMark"
									className="h-6 w-6 mt-1 text-gray-500"
								/>
							</div>

							<div>
								<h3 className="font-semibold text-gray-800 dark:text-gray-200 md:text-lg">
									O Grypp precisa ser instalado no computador?
								</h3>
								<p className="mt-1 text-gray-500">
									Não. O Grypp não precisa ser instalado no computador e
									totalmente online. Você pode acessar de qualquer lugar e de
									qualquer dispositivo.
								</p>
							</div>
						</div>
					</div>

					<div className="py-8 first:pt-0 last:pb-0">
						<div className="flex gap-x-5">
							<div>
								<Icon
									name="questionMark"
									className="h-6 w-6 mt-1 text-gray-500"
								/>
							</div>

							<div>
								<h3 className="font-semibold text-gray-800 dark:text-gray-200 md:text-lg">
									Posso cancelar a qualquer momento?
								</h3>
								<p className="mt-1 text-gray-500">
									Sim, é possível realizar o cancelamento a qualquer momento.
									Não há fidelidade e você pode cancelar quando quiser. Caso
									tenha algum problema durante este processo, pode entrar em
									contato com a nossa equipe.
								</p>
							</div>
						</div>
					</div>

					<div className="py-8 first:pt-0 last:pb-0">
						<div className="flex gap-x-5">
							<div>
								<Icon
									name="questionMark"
									className="h-6 w-6 mt-1 text-gray-500"
								/>
							</div>

							<div>
								<h3 className="font-semibold text-gray-800 dark:text-gray-200 md:text-lg">
									O que eu ganho como beta-tester?
								</h3>
								<p className="mt-1 text-gray-500">
									Todos os treinadores que apoiarem o processo inicial serão
									adicionados a uma lista de espera para receber um desconto
									especial quando o Grypp for lançado oficialmente. Além de
									outras bonificações por ter auxiliado nossa construção.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/**<!-- End FAQ --> */}
		</>
	);
}

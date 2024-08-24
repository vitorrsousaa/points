"use client";

import { Icon } from "@shared/ui";
import Image from "next/image";

export function Features() {
	return (
		<>
			<div className="mx-auto max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
				{/*<!-- Grid --> */}
				<div className=" lg:items-center lg:gap-8">
					{/*<!-- End Col --> */}

					<div className="mt-5 sm:mt-10 lg:col-span-5 lg:mt-0">
						<div className="space-y-6 sm:space-y-8">
							{/*<!-- Title --> */}
							<div className="space-y-2 md:space-y-4 text-center">
								<h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 lg:text-4xl">
									Ferramenta completa para o seu atendimento
								</h2>
								<p className="text-gray-500 text-center">
									Com a simplicidade e eficácia do nosso software, você pode
									transformar seus planos de treinamento em resultados concretos
									de forma fácil e intuitiva.
								</p>
							</div>
							{/*<!-- End Title --> */}

							{/*<!-- List --> */}
							<ul className="space-y-2 sm:space-y-4">
								<li className="flex space-x-3">
									<Icon
										name="check_without_circle"
										className="mt-0.5 h-5 w-5 text-orange-600"
									/>

									<span className="text-sm text-gray-500 sm:text-base">
										<span className="font-bold">Protocolo de treino</span>{" "}
										personalizado
									</span>
								</li>

								<li className="flex space-x-3">
									<Icon
										name="check_without_circle"
										className="mt-0.5 h-5 w-5 text-orange-600"
									/>

									<span className="text-sm text-gray-500 sm:text-base">
										Exercícios customizados e feedbacks para os atletas.
									</span>
								</li>

								<li className="flex space-x-3">
									{/*<!-- Solid Check --> */}
									<Icon
										name="check_without_circle"
										className="mt-0.5 h-5 w-5 text-orange-600"
									/>

									<span className="text-sm text-gray-500 sm:text-base">
										Gráficos para acompanhar a{" "}
										<span className="font-bold">evolução</span> do atleta
									</span>
								</li>
							</ul>
							{/*<!-- End List --> */}
						</div>
					</div>
					{/*<!-- End Col --> */}
				</div>
			</div>
		</>
	);
}

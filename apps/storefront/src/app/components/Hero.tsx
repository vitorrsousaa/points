"use client";

import { ROUTES } from "@/config/routes";
import { Button, Icon } from "@shared/ui";

export function Hero() {
	return (
		<>
			<div className="relative w-full overflow-hidden before:absolute before:start-1/2 before:top-0 before:-z-[1] before:h-full before:w-full before:-translate-x-1/2 before:transform before:bg-[url('/polygon-bg-element-light.svg')] before:bg-cover before:bg-top before:bg-no-repeat ">
				<div className="mx-auto max-w-[85rem] px-4 pb-10 pt-24 sm:px-6 lg:px-8">
					<div className="flex justify-center">
						<a
							className="inline-flex items-center gap-x-2 rounded-full border border-orange-200/80 bg-white p-1 ps-3 text-sm text-gray-800 transition hover:border-orange-300 dark:border-orange-700 dark:bg-orange-800 dark:text-gray-200 dark:hover:border-orange-600 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
							href="https://wa.me/5521998217463"
						>
							Faça parte da lista de espera
							<span className="inline-flex items-center justify-center gap-x-2 rounded-full bg-orange-500/20 px-2.5 py-1.5 text-sm font-semibold text-gray-600 dark:bg-orange-900 dark:text-gray-400 hover:bg-orange-600/30">
								<Icon name="arrow_right" />
							</span>
						</a>
					</div>

					{/*<!-- Title --> */}
					<div className="mx-auto mt-5 max-w-2xl text-center">
						<h1 className="block text-4xl font-bold text-gray-800 dark:text-gray-200 md:text-5xl lg:text-6xl">
							O seu novo software de
							<span className="bg-gradient-to-tl from-primary to-orange-600 bg-clip-text text-transparent">
								{" "}
								treinamento
							</span>
						</h1>
					</div>

					<div className="mx-auto mt-5 max-w-3xl text-center">
						<p className="text-lg text-gray-600 dark:text-gray-400">
							Bem-vindo à era da excelência em treinamento! Aqui, unimos forças
							com os melhores do powerlifting para oferecer a você o que há de
							mais inovador e eficiente.
						</p>
					</div>

					{/*<!-- Buttons --> */}
					<div className="mb-8 mt-12 flex justify-center">
						<a href={ROUTES.LOGIN}>
							<Button size={"lg"} className="py-3">
								Comece agora
								<Icon name="arrow_right" />
							</Button>
						</a>
					</div>
					{/*<!-- End Buttons --> */}
				</div>
			</div>
		</>
	);
}

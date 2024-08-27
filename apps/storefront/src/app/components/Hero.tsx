"use client";

import { ROUTES } from "@/config/routes";
import { Button, Icon } from "@shared/ui";

export function Hero() {
	return (
		<div className="relative w-full overflow-hidden before:absolute before:start-1/2 before:top-0 before:-z-[1] before:h-full before:w-full before:-translate-x-1/2 before:transform before:bg-[url('/polygon-bg-element-light.svg')] before:bg-cover before:bg-top before:bg-no-repeat pt-24">
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
			<div className="mx-auto mt-6 max-w-4xl text-center">
				<h1 className="block text-4xl font-medium text-gray-800 dark:text-gray-200 md:text-5xl lg:text-6xl">
					Eleve
					<span className="bg-gradient-to-tl from-primary to-orange-600 bg-clip-text text-transparent">
						{" "}
						seus treinos{" "}
					</span>
					sem precisar de
					<span className="bg-gradient-to-tl from-primary to-orange-600 bg-clip-text text-transparent">
						{" "}
						planilhas
					</span>
				</h1>
			</div>

			<div className="mx-auto mt-5 max-w-3xl text-center">
				<p className="text-lg text-gray-600 dark:text-gray-400">
					Crie, acompanhe e visualize a evolução dos seus atletas. Personalize
					exercícios, colete feedbacks e exiba o progresso de forma intuitiva.
				</p>
			</div>

			{/*<!-- Buttons --> */}
			<div className="flex flex-col gap-6 items-center justify-center mb-16 mt-8">
				<a href={ROUTES.LOGIN}>
					<Button size="lg" className="items-center">
						Começar agora
						<Icon name="arrow_right" className="ml-2 h-4 w-4" />
					</Button>
				</a>

				<script
					src="https://widget.senja.io/widget/218a4062-28df-4215-aba0-887f25b0ecb1/platform.js"
					type="text/javascript"
					async
				/>
				<div
					className="senja-embed"
					data-id="218a4062-28df-4215-aba0-887f25b0ecb1"
					data-mode="shadow"
					data-lazyload="false"
					style={{ display: "block" }}
				/>
			</div>
			{/*<!-- End Buttons --> */}

			<div className="h-[580px] w-full max-w-4xl mx-auto bg-gray-100 border rounded-xl overflow-hidden">
				<img
					src="/dash.png"
					className="object-cover object-top h-full w-full"
					title="Dashboard - GRYPP"
					alt="Dashboard - GRYPP"
				/>
			</div>
		</div>
	);
}

"use client";

import { ROUTES } from "@/config/routes";
import { Button, Icon } from "@shared/ui";

export function Footer() {
	return (
		<footer className="mx-auto w-full bg-black">
			<div className="w-full h-20 rounded-bl-[32px] rounded-br-[32px] md:rounded-bl-[72px] md:rounded-br-[72px] bg-white" />

			{/** <!-- Grid --> */}
			<div className="text-center px-4 py-10 sm:px-6 lg:px-8">
				<div>
					<a
						className="flex-none text-xl font-semibold text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
						href={ROUTES.HOME}
						aria-label="Brand"
					>
						Grypp
					</a>
				</div>
				{/** <!-- End Col --> */}

				<div className="flex flex-wrap gap-6 justify-center items-center my-10">
					<a href="#funcionalidades" className="text-white">
						Funcionalidades
					</a>
					<a href="#planos" className="text-white">
						Planos
					</a>
					<a href="#duvidas" className="text-white">
						Dúvidas
					</a>
				</div>

				<div className="mt-3">
					<p className="text-white">
						Copyright © grypp 2024 - Todos os direitos reservados.
					</p>
				</div>

				{/** <!-- Social Brands --> */}
				<div className="mt-3 space-x-2">
					<Button variant={"link"} size="icon">
						<Icon name="instagram" className="inline-flex h-6 w-6 text-white" />
					</Button>
				</div>
				{/** <!-- End Social Brands --> */}
			</div>
			{/** <!-- End Grid --> */}
		</footer>
	);
}

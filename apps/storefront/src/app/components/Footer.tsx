"use client";

import { ROUTES } from "@/config/routes";
import { Button, Icon } from "@shared/ui";

export function Footer() {
	return (
		<footer className="mx-auto w-full max-w-[85rem] border-t-[1px] border-t-gray-200 px-4 py-10 sm:px-6 lg:px-8">
			{/** <!-- Grid --> */}
			<div className="text-center">
				<div>
					<a
						className="flex-none text-xl font-semibold text-black dark:text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
						href={ROUTES.HOME}
						aria-label="Brand"
					>
						Grypp
					</a>
				</div>
				{/** <!-- End Col --> */}

				<div className="mt-3">
					<p className="text-gray-500">
						Copyright © grypp 2024 - Todos os direitos reservados.
					</p>
				</div>

				{/** <!-- Social Brands --> */}
				<div className="mt-3 space-x-2">
					<Button variant={"link"} size="icon">
						<Icon
							name="instagram"
							className="inline-flex h-6 w-6 text-gray-500"
						/>
					</Button>
				</div>
				{/** <!-- End Social Brands --> */}
			</div>
			{/** <!-- End Grid --> */}
		</footer>
	);
}

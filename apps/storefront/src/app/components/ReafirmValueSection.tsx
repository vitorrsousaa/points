import { Button } from "@shared/ui";

export function ReafirmValueSection() {
	return (
		<div className="flex flex-col items-center text-center w-full border-t-[1px] border-t-gray-200 pt-20 m">
			<h3 className="block text-4xl font-medium tracking-tighter text-gray-800 dark:text-gray-200">
				<strong className="bg-gradient-to-tl from-primary to-orange-600 bg-clip-text text-transparent font-bold">
					Esqueça{" "}
				</strong>
				planilhas,
				<strong className="bg-gradient-to-tl from-primary to-orange-600 bg-clip-text text-transparent font-bold">
					{" "}
					economize{" "}
				</strong>
				tempo e <br />
				<strong className="bg-gradient-to-tl from-primary to-orange-600 bg-clip-text text-transparent font-bold">
					{" "}
					evolua{" "}
				</strong>
				com a gente
			</h3>

			<Button size="lg" className="mt-6">
				Começar agora
			</Button>
		</div>
	);
}

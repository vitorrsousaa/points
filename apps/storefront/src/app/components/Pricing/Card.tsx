import { ROUTES } from "@/config/routes";
import { Button, cn, Icon } from "@shared/ui";

interface CardProps {
	title: string;
	description: string;
	price: number;
	benefits: string[];
	malefits?: string[];
	mostPopular?: boolean;
	footer?: string;
}

export function Card(props: CardProps) {
	const { title, description, price, benefits, malefits, footer, mostPopular } =
		props;

	return (
		<div>
			{/**<!-- Card --> */}
			<div className="relative z-10 rounded-xl border bg-white p-4 md:p-10">
				<h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">
					{title}
				</h3>
				<div className="text-sm text-gray-400">{description}</div>

				{mostPopular && (
					<span className="absolute end-0 top-0 rounded-es-xl rounded-se-xl bg-orange-800 px-3 py-1.5 text-xs font-medium text-white dark:bg-white dark:text-gray-800">
						Mais Popular
					</span>
				)}

				<div className="mt-5">
					<span className="text-6xl font-bold text-gray-800 dark:text-gray-200">
						R$ {price}
					</span>
					<span className="text-lg font-bold text-gray-800 dark:text-gray-200">
						.00
					</span>
					<span className="ms-3 text-gray-400">BRL / mensalmente</span>
				</div>

				<div className="mt-5 grid gap-y-2 py-4 first:pt-0 last:pb-0 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-0">
					{/**<!-- List --> */}
					<ul className="space-y-2 text-sm sm:text-base">
						{benefits.map((benefit) => (
							<li className="flex space-x-3" key={benefit}>
								<Icon
									name="check"
									className="h-5 w-5 mt-0.5 bg-orange-200 rounded-full text-orange-600"
								/>
								<span className="text-gray-800 dark:text-gray-200">
									{benefit}
								</span>
							</li>
						))}
					</ul>
					{/**<!-- End List --> */}

					{/**<!-- List --> */}
					{malefits && (
						<ul className="space-y-2 text-sm sm:text-base">
							{malefits.map((malefit) => (
								<li className="flex space-x-3" key={malefit}>
									<span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-200 text-gray-500 dark:bg-gray-800">
										<Icon name="check" />
									</span>
									<span className="text-gray-800 dark:text-gray-200">
										{malefit}
									</span>
								</li>
							))}
						</ul>
					)}

					{/**<!-- End List --> */}
				</div>

				<div className="mt-5 grid grid-cols-2 gap-x-4 py-4 first:pt-0 last:pb-0">
					<div>
						<p className="text-sm text-gray-500">
							{footer ? footer : "Cancele qualquer momento."}
						</p>
					</div>

					<div className="flex justify-end">
						<a href={ROUTES.LOGIN}>
							<Button variant={mostPopular ? "default" : "outline"}>
								Cadastre-se
							</Button>
						</a>
					</div>
				</div>
			</div>
			{/**<!-- End Card --> */}
		</div>
	);
}

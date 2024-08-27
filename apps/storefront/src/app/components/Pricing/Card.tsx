import { ROUTES } from "@/config/routes";
import { Button, Icon } from "@shared/ui";

interface CardProps {
	label: string;
	title: string;
	description: string;
	price: number;
	benefits: string[];
	malefits?: string[];
	mostPopular?: boolean;
}

export function Card(props: CardProps) {
	const { title, description, price, benefits, malefits, label, mostPopular } =
		props;

	return (
		<div className="rounded-2xl border bg-white relative z-10 overflow-hidden">
			{label && (
				<span
					className={`block text-center w-full px-3 py-3 text-sm font-semibold border-b-2 dark:bg-white dark:text-gray-800 ${
						mostPopular
							? "bg-orange-500 text-white border-orange-500"
							: "bg-gray-100 text-gray-800"
					}`}
				>
					{label}
				</span>
			)}

			{/**<!-- Card --> */}
			<div className="p-4 pt-8">
				<div className="px-4">
					<div>
						<span className="tracking-wider">PLANO</span>
						<h3 className="text-3xl font-semibold text-gray-800 dark:text-gray-200">
							{title}
						</h3>
					</div>

					<div className="mt-6 gap-y-2">
						{/**<!-- List --> */}
						<ul className="space-y-2 text-sm sm:text-base w-full flex flex-col">
							{benefits.map((benefit) => (
								<li className="flex space-x-3" key={benefit}>
									<Icon
										name="check_without_circle"
										className="h-6 w-6 text-orange-600"
									/>
									<span className="text-gray-600 dark:text-gray-200">
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

						<li className="flex items-center space-x-3 mt-2">
							<Icon
								name="filledStar"
								className="h-5 w-5 ml-0.5 text-orange-600"
							/>

							<span className="text-gray-600 dark:text-gray-200">
								...muito mais vindo aí!
							</span>
						</li>
						{/**<!-- End List --> */}
					</div>
				</div>

				<div className="mt-6 flex flex-col gap-4 py-4 border p-4 rounded-xl">
					<div>
						<span className="text-4xl md:text-5xl font-medium text-gray-800 dark:text-gray-200">
							R$ {price}
						</span>
						<span className="text-lg font-semibold text-gray-800 dark:text-gray-200">
							,00
						</span>
						<span className="ms-2 text-muted-foreground">/ mês</span>

						<small className="block mt-2 text-muted-foreground">
							Cancele quando quiser.
						</small>
					</div>

					{description && (
						<p className="text-base text-gray-700 text-pretty ">
							{description}
						</p>
					)}

					<a href={ROUTES.LOGIN} className="w-full">
						<Button
							className="w-full"
							size="lg"
							variant={mostPopular ? "default" : "outline"}
						>
							Selecionar Plano
						</Button>
					</a>
				</div>
			</div>
			{/**<!-- End Card --> */}
		</div>
	);
}

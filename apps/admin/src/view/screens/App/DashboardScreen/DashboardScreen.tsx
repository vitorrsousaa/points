import { useGrowthAthlete, useGrowthCoach } from "@/hooks/growth";
import {
	Button,
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
	Icon,
	RenderIf,
	Skeleton,
	Spinner,
	cn,
} from "@shared/ui";
import { useState } from "react";

interface GrowthAnalyticsCardProps {
	title: string;
	value: number;
	percentage?: string;
	isFetching?: boolean;
	isError?: boolean;
	period: number;
}

const POSSIBLE_PERIODS = [
	{ label: "último mês", value: 1 },
	{ label: "2 meses atrás", value: 2 },
	{ label: "3 meses atrás", value: 3 },
	{ label: "6 meses atrás", value: 6 },
];

export function GrowthAnalyticsCard(props: GrowthAnalyticsCardProps) {
	const { title, value, percentage, isFetching, isError, period } = props;

	return (
		<Card
			className={cn(
				"w-full",
				isError && "border-destructive bg-destructive/10",
			)}
		>
			<CardHeader className="pb-2 flex flex-row justify-between items-start">
				<div>
					<CardDescription>{title}</CardDescription>
					<CardTitle className="text-4xl">{value}</CardTitle>
				</div>
				{isFetching && <Spinner className="h-4 w-4" />}
			</CardHeader>

			<CardContent>
				<p className="text-xs text-muted-foreground">
					{percentage || 0}% que{" "}
					{POSSIBLE_PERIODS.find((item) => item.value === period)?.label}
				</p>
			</CardContent>
		</Card>
	);
}

export function DashboardScreen() {
	const [period, setPeriod] = useState(1);

	const {
		growthAthlete,
		isFetchingGrowthAthlete,
		isErrorGrowthAthlete,
		isLoadingGrowthAthlete,
	} = useGrowthAthlete(period);

	const {
		growthCoach,
		isFetchingGrowthCoach,
		isErrorGrowthCoach,
		isLoadingGrowthCoach,
	} = useGrowthCoach(period);

	return (
		<div className="w-full flex flex-col">
			<main>
				<div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
					<div className="space-y-4">
						<RenderIf
							condition={!isLoadingGrowthAthlete && !isLoadingGrowthCoach}
							render={
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button variant="outline" size="sm" className="h-9 gap-1">
											<Icon name="filter" className="h-3.5 w-3.5" />
											<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
												Intervalo de tempo
											</span>
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent align="end">
										<DropdownMenuLabel>Buscar por</DropdownMenuLabel>
										<DropdownMenuSeparator />
										{POSSIBLE_PERIODS.map((item) => (
											<DropdownMenuCheckboxItem
												key={item.value}
												onClick={() => setPeriod(item.value)}
												checked={period === item.value}
											>
												{item.label}
											</DropdownMenuCheckboxItem>
										))}
									</DropdownMenuContent>
								</DropdownMenu>
							}
						/>
						<div className="grid gap-4 grid-cols-2">
							<RenderIf
								condition={isLoadingGrowthAthlete || isLoadingGrowthCoach}
								render={
									<>
										<Skeleton className="w-full rounded-xl h-40" />
										<Skeleton className="w-full rounded-xl h-40" />
									</>
								}
							/>

							<RenderIf
								condition={!isLoadingGrowthAthlete && !isLoadingGrowthCoach}
								render={
									<>
										<GrowthAnalyticsCard
											title="Treinadores"
											value={growthCoach?.length || 0}
											percentage={growthCoach?.growth}
											isFetching={isFetchingGrowthCoach}
											isError={isErrorGrowthCoach}
											period={period}
										/>
										<GrowthAnalyticsCard
											title="Atletas"
											value={growthAthlete?.length || 0}
											percentage={growthAthlete?.growth}
											isFetching={isFetchingGrowthAthlete}
											isError={isErrorGrowthAthlete}
											period={period}
										/>
									</>
								}
							/>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}

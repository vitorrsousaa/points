import type { Athlete } from "@/entitites/athlete";
import { useGetAthleteGrowth } from "@/hooks/coach";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	Skeleton,
} from "@shared/ui";
import { AthletesAnalyticsCard } from "./AthletesAnalyticsCard";

interface AthletesAnalyticsProps {
	isLoading: boolean;
	athletes?: Athlete[];
}

export function AthletesAnalytics({
	athletes,
	isLoading,
}: AthletesAnalyticsProps) {
	const {
		growth,
		isLoadingAthleteGrowth,
		isErrorAthleteGrowth,
		isFetchingAthleteGrowth,
	} = useGetAthleteGrowth();

	if (isLoading || isLoadingAthleteGrowth) {
		return (
			<>
				<Skeleton className="w-full rounded-xl h-40" />
				<Skeleton className="w-full rounded-xl h-40" />
			</>
		);
	}

	return (
		<>
			<AthletesAnalyticsCard
				title="Total de atletas"
				percentage={growth}
				value={athletes?.length || 0}
				isFetching={isFetchingAthleteGrowth}
				isError={isErrorAthleteGrowth}
			/>

			<Card className="w-full">
				<CardHeader className="pb-2">
					<CardDescription>Ativos agora</CardDescription>
					<CardTitle className="text-4xl">
						{athletes?.filter((item) => Boolean(item.age)).length}
					</CardTitle>
				</CardHeader>

				<CardContent>
					<p className="text-xs text-muted-foreground">
						+20.1% que o último mês
					</p>
				</CardContent>
			</Card>
		</>
	);
}

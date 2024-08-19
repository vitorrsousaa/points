import type { Athlete } from "@/entitites/athlete";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	Skeleton,
} from "@shared/ui";

interface AthletesAnalyticsProps {
	isLoading: boolean;
	athletes?: Athlete[];
}

export function AthletesAnalytics({
	athletes,
	isLoading,
}: AthletesAnalyticsProps) {
	if (isLoading) {
		return (
			<>
				<Skeleton className="w-full rounded-xl h-40" />
				<Skeleton className="w-full rounded-xl h-40" />
			</>
		);
	}

	return (
		<>
			<Card className="w-full">
				<CardHeader className="pb-2">
					<CardDescription>Total de alunos</CardDescription>
					<CardTitle className="text-4xl">{athletes?.length}</CardTitle>
				</CardHeader>

				<CardContent>
					<p className="text-xs text-muted-foreground">
						+20.1% que o último mês
					</p>
				</CardContent>
			</Card>

			<Card className="w-full">
				<CardHeader className="pb-2">
					<CardDescription>Ativos agora</CardDescription>
					<CardTitle className="text-4xl">
						{
							athletes?.filter((item) => Boolean(item.accountConfirmation))
								.length
						}
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

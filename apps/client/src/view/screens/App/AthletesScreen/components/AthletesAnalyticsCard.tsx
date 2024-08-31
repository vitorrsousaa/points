import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	cn,
	Spinner,
} from "@shared/ui";

interface AthletesAnalyticsCardProps {
	title: string;
	value: number;
	percentage?: string;
	isFetching?: boolean;
	isError?: boolean;
}

export function AthletesAnalyticsCard(props: AthletesAnalyticsCardProps) {
	const { title, value, percentage, isFetching, isError } = props;

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
					{percentage || 0}% que o último mês
				</p>
			</CardContent>
		</Card>
	);
}

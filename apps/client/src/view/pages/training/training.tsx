import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@shared/ui";
import { useParams } from "react-router-dom";

export function Training() {
	const { athleteId } = useParams<{ athleteId: string }>();

	console.log(athleteId);
	return (
		<>
			<div className="grid flex-1 items-start gap-4 md:gap-8">
				<Card>
					<CardHeader>
						<CardTitle>Atleta</CardTitle>
						<CardDescription>Acompanhe o desempenho do atleta.</CardDescription>
					</CardHeader>
					<CardContent>Breve informação sobre o atleta</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle>Atleta</CardTitle>
						<CardDescription>Acompanhe o desempenho do atleta.</CardDescription>
					</CardHeader>
					<CardContent>Breve informação sobre o atleta</CardContent>
				</Card>
			</div>
		</>
	);
}

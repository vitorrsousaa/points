import {
	Button,
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
	HeaderScreen,
} from "@shared/ui";
import { Onboarding } from "./components";

export function DashboardScreen() {
	return (
		<div className="w-full flex flex-col">
			<Onboarding />
			<HeaderScreen title="Visão geral" />

			<main>
				<div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
					<div className="space-y-4">
						<Card className="sm:col-span-2" x-chunk="dashboard-05-chunk-0">
							<CardHeader className="pb-3">
								<CardTitle>Seus atletas</CardTitle>
								<CardDescription className="text-balance leading-relaxed w-full">
									Você possui 3 treinos pendentes para analisar e aprovar. Click
									no botão abaixo para visualizar.
								</CardDescription>
							</CardHeader>
							<CardFooter>
								<Button>Visualizar treinos</Button>
							</CardFooter>
						</Card>
						<div className="grid gap-4 grid-cols-2">
							<Card x-chunk="dashboard-05-chunk-1">
								<CardHeader className="pb-2">
									<CardDescription>Treinos desta semana</CardDescription>
									<CardTitle className="text-4xl">3</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="text-xs text-muted-foreground">
										+25% a mais que a semana passada
									</div>
								</CardContent>
							</Card>
							<Card x-chunk="dashboard-05-chunk-2">
								<CardHeader className="pb-2">
									<CardDescription>This Month</CardDescription>
									<CardTitle className="text-4xl">$5,329</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="text-xs text-muted-foreground">
										+10% from last month
									</div>
								</CardContent>
							</Card>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}

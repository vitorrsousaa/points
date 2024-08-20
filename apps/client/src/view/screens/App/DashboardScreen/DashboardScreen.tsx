import {
	Button,
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@shared/ui";
import { OnboardingList } from "./components/OnboardingList";

export function DashboardScreen() {
	return (
		<div className="w-full flex flex-col">
			<main>
				<div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
					<div className="space-y-4">
						<OnboardingList />

						<h2>Visão geral</h2>

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

						<div className="grid gap-4 grid-cols-3">
							<Card>
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

							<Card>
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

							<Card>
								<CardHeader className="pb-2">
									<CardDescription>Plano</CardDescription>
									<CardTitle className="text-4xl">Gratuito</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="text-xs text-muted-foreground">
										Escolha um plano
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

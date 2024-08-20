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
		<main className="space-y-4 w-full flex flex-col">
			<OnboardingList />

			<h2 className="font-semibold text-lg md:text-xl">Visão geral</h2>

			<Card className="w-full md:col-span-2" x-chunk="dashboard-05-chunk-0">
				<CardHeader className="pb-3">
					<CardTitle className="text-lg">Meus atletas</CardTitle>
					<CardDescription className="text-balance leading-relaxed w-full">
						Você possui 3 treinos pendentes para analisar e aprovar. Clique no
						botão abaixo para visualizar.
					</CardDescription>
				</CardHeader>
				<CardFooter>
					<Button>Visualizar treinos</Button>
				</CardFooter>
			</Card>

			<div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
				<Card>
					<CardHeader className="pb-2">
						<CardDescription className="text-sm md:text-base">
							Meus atletas
						</CardDescription>
						<CardTitle className="text-2xl md:text-4xl font-semibold tracking-tight">
							34
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-xs md:text-sm text-muted-foreground">
							Parabéns, o número de atletas está crescendo.
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="pb-2">
						<CardDescription className="text-sm md:text-base">
							Treinos desta semana
						</CardDescription>
						<CardTitle className="text-2xl md:text-4xl font-semibold tracking-tight">
							3
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-xs md:text-sm text-muted-foreground">
							+25% a mais que a semana passada
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="pb-2">
						<CardDescription className="text-sm md:text-base">
							Plano
						</CardDescription>
						<CardTitle className="text-2xl md:text-4xl font-semibold tracking-tight">
							Gratuito
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-xs md:text-sm text-muted-foreground">
							Escolha um plano
						</div>
					</CardContent>
				</Card>
			</div>
		</main>
	);
}

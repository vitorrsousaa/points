import {
	Button,
	Card,
	CardFooter,
	CardHeader,
	CardTitle,
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
	Icon,
	Progress,
} from "@shared/ui";

export function OnboardingList() {
	return (
		<div className="space-y-4 mb-8">
			<Collapsible className="space-y-4" defaultOpen>
				<header className="flex items-center justify-between">
					<h2 className="whitespace-nowrap">Comece a configurar por aqui</h2>

					<div className="flex items-center w-full justify-end gap-4">
						<Progress value={33} className="w-[40%] h-3" />
						<span className="flex items-center gap-2">
							1 de 3
							<CollapsibleTrigger>
								<Icon name="double_arrow" className="h-6 w-6" />
							</CollapsibleTrigger>
						</span>
					</div>
				</header>

				<CollapsibleContent>
					<div className="grid grid-cols-3 gap-4">
						<Card>
							<CardHeader>
								<CardTitle>Crie sua conta</CardTitle>
							</CardHeader>

							<CardFooter>Concluido</CardFooter>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Adicione seu primeiro atleta</CardTitle>
							</CardHeader>

							<CardFooter>
								<Button>Começar</Button>
							</CardFooter>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Crie um treino e vincule ao atleta</CardTitle>
							</CardHeader>

							<CardFooter>
								<Button disabled>Vincular</Button>
							</CardFooter>
						</Card>
					</div>
				</CollapsibleContent>
			</Collapsible>
		</div>
	);
}

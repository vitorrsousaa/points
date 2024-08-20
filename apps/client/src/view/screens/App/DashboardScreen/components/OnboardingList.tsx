import { ROUTES } from "@/config/routes";
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
import { Link } from "react-router-dom";

export function OnboardingList() {
	return (
		<div className="space-y-4 mb-8">
			<Collapsible className="space-y-4" defaultOpen>
				<header className="flex flex-col md:flex-row items-start md:items-center justify-between">
					<h2 className="whitespace-nowrap font-semibold text-lg md:text-xl">
						Comece a configurar por aqui
					</h2>

					<div className="flex flex-row items-center w-full justify-between md:justify-end gap-4 mt-4 md:mt-0">
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
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
						<Card className="border-green-700 bg-green-100">
							<CardHeader>
								<CardTitle className="flex flex-col gap-4 text-green-700 font-normal">
									<Icon name="person" className="h-5 w-5" />
									Crie sua conta
								</CardTitle>
							</CardHeader>

							<CardFooter className="text-green-700 font-bold justify-between">
								Concluido
								<Icon name="check" className="h-5 w-5" />
							</CardFooter>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle className="flex flex-col gap-4 font-normal">
									<Icon name="plusCircle" className="h-5 w-5" />
									Adicione seu primeiro atleta
								</CardTitle>
							</CardHeader>

							<CardFooter>
								<Link to={ROUTES.NEW_ATHLETE} className="w-full ">
									<Button className="w-full h-8">Começar</Button>
								</Link>
							</CardFooter>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle className="flex flex-col gap-4 font-normal">
									<Icon name="lightning" className="h-5 w-5" />
									Crie um treino para o atleta
								</CardTitle>
							</CardHeader>

							<CardFooter>
								<Button disabled className="w-full h-8">
									Criar
								</Button>
							</CardFooter>
						</Card>
					</div>
				</CollapsibleContent>
			</Collapsible>
		</div>
	);
}

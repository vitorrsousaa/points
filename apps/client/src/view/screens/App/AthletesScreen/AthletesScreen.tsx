import { ROUTES } from "@/config/routes";
import {
	Badge,
	Button,
	Card,
	CardContent,
	HeaderScreen,
	RenderIf,
	Skeleton,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@shared/ui";
import { Link } from "react-router-dom";

import {
	AthletesAnalytics,
	AthleteTableHeader,
	TableActions,
	TableAvailableAthlete,
	TableRowAthlete,
} from "./components";
import { useAthletesScreen } from "./useAthletesScreen";

export function AthletesScreen() {
	const {
		athletes,
		filteredAthletes,
		hasAthletes,
		isErrorAthletes,
		isLoadingAthletes,
		searchControl,
	} = useAthletesScreen();

	return (
		<div className="flex flex-col gap-4 w-full">
			<HeaderScreen
				title="Meus atletas"
				description="Gerencie seus atletas, veja suas informações e acesse suas fichas de treino."
			/>

			<RenderIf
				condition={!isErrorAthletes}
				render={
					<div className="flex flex-col sm:flex-row gap-4 mb-4">
						<AthletesAnalytics
							isLoading={isLoadingAthletes}
							athletes={athletes}
						/>
					</div>
				}
			/>

			<Card className="p-4 rounded-xl border flex items-center">
				<CardContent className="p-0 w-full flex items-center justify-between gap-2">
					<AthleteTableHeader searchControl={searchControl} />
				</CardContent>
			</Card>

			<div className="p-4 border rounded-xl bg-card">
				<RenderIf
					condition={isLoadingAthletes}
					render={
						<div className="flex flex-col gap-2">
							{Array.from({ length: 5 }).map((item) => (
								<Skeleton key={Number(item)} className="h-20 w-full" />
							))}
						</div>
					}
				/>

				<RenderIf
					condition={isErrorAthletes}
					render={
						<div className="w-full flex flex-col gap-2 items-center justify-center mt-14">
							<strong className="font-medium">
								Tivemos um erro para buscar os atletas.
							</strong>
							<span className="text-muted-foreground">Tente novamente!</span>
						</div>
					}
				/>

				<RenderIf
					condition={hasAthletes && !isLoadingAthletes && !isErrorAthletes}
					render={
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Nome</TableHead>
									<TableHead className="hidden lg:table-cell">
										Categoria
									</TableHead>
									<TableHead className="hidden min-[430px]:table-cell sm:hidden md:table-cell">
										Peso (kg)
									</TableHead>
									<TableHead className="text-center">Ações</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{filteredAthletes?.map((athlete) => (
									<TableRowAthlete status={athlete.status} key={athlete.id}>
										<TableCell>
											<div className="flex flex-col gap-2">
												<span className="font-medium flex gap-4">
													{athlete.name}
													<TableAvailableAthlete
														isActive={Boolean(athlete.isActive)}
														className="hidden"
													/>
												</span>

												<span className="hidden sm:flex text-sm text-muted-foreground md:inline">
													{athlete.email}
												</span>
											</div>
										</TableCell>

										<TableCell className="hidden lg:table-cell">
											<Badge variant="outline">Categoria</Badge>
										</TableCell>

										<TableCell className="hidden min-[430px]:table-cell sm:hidden md:table-cell">
											{athlete.weight}
										</TableCell>

										<TableActions
											status={athlete.status}
											athlete={athlete}
											className=""
										/>
									</TableRowAthlete>
								))}
							</TableBody>
						</Table>
					}
				/>

				<RenderIf
					condition={!hasAthletes && !isLoadingAthletes && !isErrorAthletes}
					render={
						<div className="w-full flex flex-col gap-2 items-center justify-center mt-14">
							<strong className="font-medium">
								Você ainda não possui atletas cadastrados.
							</strong>
							<Link to={ROUTES.NEW_ATHLETE}>
								<Button>Adicionar atleta</Button>
							</Link>
						</div>
					}
				/>
			</div>
		</div>
	);
}

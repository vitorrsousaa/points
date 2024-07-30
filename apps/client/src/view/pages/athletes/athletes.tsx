import { ROUTES } from "@/config/routes";
import { useGetAllAthletes } from "@/hooks/athlete";
import { useAuth } from "@/hooks/auth";
import {
	Badge,
	Button,
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
	Icon,
	Input,
	Spinner,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@shared/ui";
import { Link } from "react-router-dom";
import {
	TableActions,
	TableAvailableAthlete,
	TableRowAthlete,
} from "../athletes/components/table-row";

export function Athletes() {
	const { id } = useAuth();

	const { athletes, isLoadingAthletes, isErrorAthletes } =
		useGetAllAthletes(id);

	const hasAthletes = Boolean(athletes && athletes?.length > 0);

	return (
		<>
			{isLoadingAthletes ? (
				<div className="w-full flex flex-col gap-4 items-center justify-center mt-14">
					<small>Buscando seus atletas...</small>
					<Spinner />
				</div>
			) : isErrorAthletes ? (
				<div className="w-full flex flex-col gap-2 items-center justify-center mt-14">
					<strong className="font-medium">
						Tivemos um erro para buscar os atletas.
					</strong>
					<span className="text-muted-foreground">Tente novamente!</span>
				</div>
			) : (
				<>
					<div className="grid flex-1 items-start gap-4 md:gap-8">
						<div className="ml-auto flex items-center gap-2">
							<Input
								className="h-9 w-72"
								placeholder="Pesquise pelo nome do atleta"
								type="text"
							/>

							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button variant="outline" size="sm" className="h-9 gap-1">
										<Icon name="filter" className="h-3.5 w-3.5" />
										<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
											Filtro
										</span>
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align="end">
									<DropdownMenuLabel>Filtrar por</DropdownMenuLabel>
									<DropdownMenuSeparator />
									<DropdownMenuCheckboxItem checked>
										Status
									</DropdownMenuCheckboxItem>
									<DropdownMenuCheckboxItem>Categoria</DropdownMenuCheckboxItem>
								</DropdownMenuContent>
							</DropdownMenu>

							<Link to={ROUTES.NEW_ATHLETE}>
								<Button size="sm" className="h-9 gap-1">
									<Icon name="plusCircle" className="h-3.5 w-3.5" />
									<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
										Adicionar atleta
									</span>
								</Button>
							</Link>
						</div>

						<Card>
							<CardHeader>
								<CardTitle>Atletas</CardTitle>
								<CardDescription>Gerencie seus atletas.</CardDescription>
							</CardHeader>
							<CardContent>
								{hasAthletes ? (
									<>
										<Table>
											<TableHeader>
												<TableRow>
													<TableHead>Nome</TableHead>
													<TableHead>Categoria</TableHead>
													<TableHead className="hidden md:table-cell">
														Status
													</TableHead>
													<TableHead>Peso (kg)</TableHead>

													<TableHead className="hidden min-[540px]:table-cell">
														<span className="sr-only">Actions</span>
													</TableHead>
												</TableRow>
											</TableHeader>
											<TableBody>
												{athletes?.map((athlete) => (
													<TableRowAthlete
														key={athlete.id}
														status={athlete.status}
													>
														<TableCell>{athlete.name}</TableCell>

														<TableCell>
															<Badge variant="outline">Categoria</Badge>
														</TableCell>

														<TableAvailableAthlete isActive />

														<TableCell className="hidden md:table-cell">
															{athlete.weight}
														</TableCell>

														<TableActions
															status={athlete.status}
															athleteId={athlete.id}
														/>
													</TableRowAthlete>
												))}
											</TableBody>
										</Table>
									</>
								) : (
									<div className="h-full w-full flex items-center justify-center flex-col gap-4 text-center">
										<small>Você ainda não tem atletas cadastrados.</small>
										<small>
											Clique no botão abaixo para cadastrar o primeiro atleta.
										</small>
										<Link to={ROUTES.NEW_ATHLETE}>
											<Button size="sm" className="h-9 gap-1">
												<Icon name="plusCircle" className="h-3.5 w-3.5" />
												<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
													Adicionar atleta
												</span>
											</Button>
										</Link>
									</div>
								)}
							</CardContent>
						</Card>
					</div>
				</>
			)}
		</>
	);
}

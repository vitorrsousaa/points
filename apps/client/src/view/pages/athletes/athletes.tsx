import { ROUTES } from "@/config/routes";
import {
	Badge,
	Button,
	Card,
	CardContent,
	CardDescription,
	CardFooter,
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
	return (
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
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Nome</TableHead>
									<TableHead>Categoria</TableHead>
									<TableHead className="hidden md:table-cell">Status</TableHead>
									<TableHead>Peso (kg)</TableHead>

									<TableHead className="hidden min-[540px]:table-cell">
										<span className="sr-only">Actions</span>
									</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								<TableRowAthlete>
									<TableCell>nome do atleta</TableCell>

									<TableCell>
										<Badge variant="outline">Categoria</Badge>
									</TableCell>

									<TableAvailableAthlete isAvailable />

									<TableCell className="hidden md:table-cell">123</TableCell>

									<TableActions status={undefined} productId={"123"} />
								</TableRowAthlete>
							</TableBody>
						</Table>
					</CardContent>
					<CardFooter>
						<div className="text-xs text-muted-foreground">
							Exibindo <strong>{12}</strong> produtos.
						</div>
					</CardFooter>
				</Card>
			</div>
		</>
	);
}

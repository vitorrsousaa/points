import {
	HeaderScreen,
	Badge,
	Button,
	Card,
	CardContent,
	RenderIf,
	Skeleton,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
	cn,
	Tooltip,
	Spinner,
	Icon,
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
} from "@shared/ui";
import { ExercisesTableHeader } from "./components/ExercisesTableHeader";
import { useNavigate } from "@/hooks/navigate";

interface TableRowProps {
	children: React.ReactNode;
	status?: "pending" | "error";
}

export function TableActions({
	status,
	athleteId,
}: {
	status?: "pending" | "error";
	athleteId: string;
}) {
	const { navigate } = useNavigate();

	return (
		<TableCell className="hidden min-[540px]:flex text-center items-center h-20">
			<RenderIf
				condition={status === "error"}
				render={
					<Tooltip content="Erro ao carregar">
						<Button aria-haspopup="true" size="icon" variant="ghost">
							<Icon name="crossCircled" className="text-primary w-5 h-5" />
							<span className="sr-only">Error</span>
						</Button>
					</Tooltip>
				}
			/>

			<RenderIf
				condition={status === "pending"}
				render={<Spinner className="w-5 h-5" />}
			/>

			<RenderIf
				condition={status !== "pending" && status !== "error"}
				render={
					<DropdownMenu>
						<Tooltip content="Ações">
							<DropdownMenuTrigger asChild>
								<Button aria-haspopup="true" size="icon" variant="ghost">
									<Icon name="dots" className="h-4 w-4" />
									<span className="sr-only">Toggle menu</span>
								</Button>
							</DropdownMenuTrigger>
						</Tooltip>
						<DropdownMenuContent align="end">
							<DropdownMenuLabel>Ações</DropdownMenuLabel>

							<DropdownMenuItem>Deletar</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				}
			/>
		</TableCell>
	);
}

export function TableRowExercise({ children, status }: TableRowProps) {
	return (
		<TableRow
			className={cn(
				"h-20 align-middle",
				status === "error" &&
					"bg-destructive/10 border-2 border-destructive/50 rounded-sm",
			)}
		>
			{children}
		</TableRow>
	);
}

export function ExercisesScreen() {
	return (
		<div className="flex flex-col gap-4">
			<HeaderScreen
				title="Exercícios customizados"
				description="Adicione novos exercícios para habilitar no treino dos seus atletas."
			/>

			<ExercisesTableHeader />

			<div className="p-4 border rounded-xl bg-card">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Nome</TableHead>
							<TableHead className="hidden md:table-cell">Equipamento</TableHead>
							<TableHead className="hidden lg:table-cell">
								Músculo primário
							</TableHead>
							<TableHead className="hidden min-[540px]:table-cell">Ações</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						<TableRowExercise>
							<TableCell className="flex">
								<span className="font-medium truncate max-w-[200px] sm:max-w-[100px] md:max-w-[110px] lg:max-w-[300px]">
									Nome do exercícioaaaaaaaaaaa
								</span>
							</TableCell>

							<TableCell className="hidden md:table-cell">
								<Badge variant="outline">Barra</Badge>
							</TableCell>

							<TableCell className="hidden lg:table-cell">
								Posteriores
							</TableCell>

							<TableActions status={undefined} athleteId={"123"} />
						</TableRowExercise>
						
					</TableBody>
				</Table>
			</div>
		</div>
	);
}

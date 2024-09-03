import {
	HeaderScreen,
	Badge,
	Button,
	Card,
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
import { useGetAllCustomExercises } from "@/hooks/exercise";

interface TableRowProps {
	children: React.ReactNode;
	status?: "pending" | "error";
}

export function TableActions({
	status,
	exerciseId,
}: {
	status?: "pending" | "error";
	exerciseId: string;
}) {
	console.log(exerciseId);
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
	const { isLoadingCustomExercises, customExercises, isErrorCustomExercises } =
		useGetAllCustomExercises();

	const hasExercises = customExercises.length > 0;

	return (
		<div className="flex flex-col gap-4">
			<HeaderScreen
				title="Exercícios customizados"
				description="Adicione novos exercícios para habilitar no treino dos seus atletas."
			/>

			<RenderIf
				condition={isLoadingCustomExercises}
				render={
					<Card>
						<div className="flex flex-col gap-2">
							<Skeleton className="h-12" />
							<Skeleton className="h-12" />
							<Skeleton className="h-12" />
						</div>
					</Card>
				}
			/>

			<RenderIf
				condition={isErrorCustomExercises}
				render={
					<div className="w-full flex flex-col gap-2 items-center justify-center mt-14">
						<strong className="font-medium text-center">
							Tivemos um erro para buscar os exercícios.
						</strong>
						<span className="text-muted-foreground">Tente novamente!</span>
					</div>
				}
			/>

			<RenderIf
				condition={
					!hasExercises && !isLoadingCustomExercises && !isErrorCustomExercises
				}
				render={
					<div className="w-full flex flex-col gap-2 items-center justify-center mt-14">
						<strong className="font-medium">
							Você ainda não possui exercícios cadastrados.
						</strong>
						<Button>Adicionar exercício</Button>
					</div>
				}
			/>

			<RenderIf
				condition={
					!isLoadingCustomExercises && !isErrorCustomExercises && hasExercises
				}
				render={
					<>
						<ExercisesTableHeader />

						<div className="p-4 border rounded-xl bg-card">
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Nome</TableHead>
										<TableHead className="hidden md:table-cell">
											Equipamento
										</TableHead>
										<TableHead className="hidden lg:table-cell">
											Músculo primário
										</TableHead>
										<TableHead className="hidden min-[540px]:table-cell">
											Ações
										</TableHead>
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

										<TableActions status={undefined} exerciseId={"123"} />
									</TableRowExercise>
								</TableBody>
							</Table>
						</div>
					</>
				}
			/>
		</div>
	);
}

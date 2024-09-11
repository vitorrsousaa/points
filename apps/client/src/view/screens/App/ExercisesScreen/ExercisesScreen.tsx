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
import { Link } from "react-router-dom";
import { ROUTES } from "@/config/routes";

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
				"h-20 align-middle relative",
				status === "error" &&
					"bg-destructive/10 border-2 border-destructive/50 rounded-sm",
				status === "pending" && "bg-primary/10",
			)}
		>
			{children}
			{status === "pending" && (
				<Spinner className="absolute bottom-0 right-5 top-2 h-4 w-4" />
			)}
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
						<Link to={ROUTES.NEW_EXERCISE}>
							<Button>Adicionar exercício</Button>
						</Link>
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
										<TableHead className="hidden lg:table-cell">
											Target
										</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{customExercises.map((exercise) => (
										<TableRowExercise
											key={exercise.id}
											status={exercise.status}
										>
											<TableCell className="font-medium truncate max-w-[200px] sm:max-w-[100px] md:max-w-[110px] lg:max-w-[300px]">
												{exercise.name}
											</TableCell>

											<TableCell className="hidden md:table-cell">
												<Badge variant="outline">{exercise.equipment}</Badge>
											</TableCell>

											<TableCell className="hidden lg:table-cell">
												{exercise.primaryMuscle}
											</TableCell>
											<TableCell className="hidden lg:table-cell">
												{exercise.target ? exercise.target : "Nenhum"}
											</TableCell>
										</TableRowExercise>
									))}
								</TableBody>
							</Table>
						</div>
					</>
				}
			/>
		</div>
	);
}

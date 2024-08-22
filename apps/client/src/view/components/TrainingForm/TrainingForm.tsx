// import { DevTool } from "@hookform/devtools";
import {
	Button,
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Icon,
	Input,
	RenderIfElse,
	ScrollArea,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	Separator,
	Textarea,
} from "@shared/ui";
import type { TTrainingFormSchema } from "./TrainingFormSchema";
import { ExerciseDetail } from "./components/ExerciseDetails";
import { ExerciseList } from "./components/ExerciseList";
import { useTrainingFormHook } from "./useTrainingForm";

export interface TrainingFormProps {
	formId?: string;
	onSubmit: (data: TTrainingFormSchema) => Promise<void>;
	isSubmitting?: boolean;
	initialValues?: TTrainingFormSchema;
}

export function TrainingForm(props: TrainingFormProps) {
	const { formId = "training-form", isSubmitting } = props;

	const {
		watchName,
		methods,
		exercises,
		volume,
		handleAddNewExercise,
		handleRemoveExercise,
		handleSubmit,
	} = useTrainingFormHook(props);

	function renderExerciseList() {
		return (
			<>
				<ScrollArea className="h-full">
					<CardContent className="space-y-4 flex-grow flex flex-col py-4">
						{exercises.map((exercise, index) => (
							<ExerciseDetail
								key={exercise.id}
								index={index}
								onRemoveExercise={handleRemoveExercise}
							/>
						))}
					</CardContent>
				</ScrollArea>

				<Separator className="mb-4" />

				<CardFooter className="flex flex-row gap-4 p-6 pt-0">
					<div className="flex flex-col gap-2">
						<small className="font-semibold text-sm">Volume sets:</small>
						<div className="flex flex-col gap-1">
							{Object.keys(volume).map((key) => (
								<small key={key} className="text-sm">
									<strong>{key}:</strong> {volume[key].sets} séries
								</small>
							))}
						</div>
					</div>
					<div className="flex flex-col gap-2">
						<small className="font-semibold text-sm">Volume load:</small>
						<div className="flex flex-col gap-1">
							{Object.keys(volume).map((key) => (
								<small key={key} className="text-sm">
									<strong>{key}:</strong> {volume[key as "S" | "B" | "D"].load}{" "}
									Kg
								</small>
							))}
						</div>
					</div>
				</CardFooter>
			</>
		);
	}

	return (
		<Form {...methods}>
			<form id={formId} onSubmit={handleSubmit} className="w-full space-y-4">
				<div className="border rounded-xl p-6 bg-card gap-4 flex flex-col">
					<Collapsible defaultOpen>
						<div className="flex items-center gap-24">
							<div className="w-full">
								<h2 className="font-semibold text-lg text-ellipsis text-pretty overflow-hidden line-clamp-1">
									Informações do treino {watchName && `- ${watchName}`}
								</h2>
							</div>

							<CollapsibleTrigger>
								<Icon name="double_arrow" className="h-6 w-6" />
							</CollapsibleTrigger>
						</div>

						<CollapsibleContent className="mt-6 space-y-4">
							<div className="flex items-center gap-4">
								<FormField
									control={methods.control}
									name="name"
									render={({ field }) => (
										<FormItem className="w-full">
											<FormLabel>Nome</FormLabel>
											<FormControl>
												<Input
													placeholder="Nome do treino"
													type="text"
													required
													disabled={isSubmitting}
													{...field}
												/>
											</FormControl>
											<FormDescription>
												Preencha com o nome do treino.
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							<div className="flex items-center gap-4 space-between">
								<FormField
									name="email"
									render={({ field }) => (
										<FormItem className="w-full">
											<FormLabel>Categoria</FormLabel>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
											>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder="Selecione a categoria" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													<SelectItem value="powerlifiting">
														Powerlifiting
													</SelectItem>
												</SelectContent>
											</Select>
											<FormDescription>Categoria do treino</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									name="isActive"
									control={methods.control}
									render={({ field }) => (
										<FormItem className="w-full">
											<FormLabel className="flex flex-row items-center gap-2">
												Status
												<Dialog>
													<DialogTrigger asChild>
														<Button
															style={{ all: "unset", cursor: "pointer" }}
															size={"icon"}
														>
															<Icon name="questionMark" className="h-4 w-4" />
														</Button>
													</DialogTrigger>

													<DialogContent className="sm:max-w-[425px]">
														<DialogHeader className="gap-2">
															<DialogTitle>Como funciona ?</DialogTitle>
															<DialogDescription>
																Quando o status é selecionado como ativo, o
																treino pode ser visualizado pelo atleta. Quando
																o status é selecionado como inativo, o treino
																não pode ser visualizado pelo atleta.
															</DialogDescription>
														</DialogHeader>
													</DialogContent>
												</Dialog>
											</FormLabel>
											<Select
												onValueChange={(value) =>
													field.onChange(value === "active")
												}
												defaultValue={field.value ? "active" : "inactive"}
											>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder="Selecione o status do treino" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													<SelectItem value="active">Ativo</SelectItem>
													<SelectItem value="inactive">Inativo</SelectItem>
												</SelectContent>
											</Select>
											<FormDescription>Status do treino</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							<FormField
								control={methods.control}
								name="description"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Descrição</FormLabel>

										<FormControl>
											<Textarea
												onChange={field.onChange}
												value={field.value}
												placeholder="Descrição do treino"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</CollapsibleContent>
					</Collapsible>
				</div>

				<div className="w-full h-[720px] flex gap-4">
					<ExerciseList onAddExercise={handleAddNewExercise} />

					<Card className="w-full flex flex-col h-full">
						<CardHeader className="space-y-2 min-h-[114px] p-6">
							<CardTitle>Exercicios adicionados</CardTitle>
							<CardDescription>
								Selecione os treinos na listagem à esquerda e acompanhe os
								detalhes completos logo abaixo.
							</CardDescription>
						</CardHeader>

						<Separator className="mb-2" />

						<RenderIfElse
							condition={exercises.length > 0}
							ifRender={renderExerciseList()}
							elseRender={
								<CardContent className="flex-grow text-center flex flex-col py-4 items-center justify-center h-full">
									<h3 className="text-xl font-semibold">Treino vazio!</h3>
									<p className="text-sm text-muted-foreground mt-1">
										Nenhum exercício adicionado.
									</p>
								</CardContent>
							}
						/>
					</Card>
				</div>
			</form>
		</Form>
	);
}

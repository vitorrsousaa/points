import {
	Button,
	Card,
	CardContent,
	CardHeader,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Icon,
	Input,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	Separator,
	Textarea,
} from "@shared/ui";
import { Controller } from "react-hook-form";
import { restTimer, typeOfSets } from "../../training.form.constants";
import { SetRow } from "../set-row";
import { useExerciseDetailHook } from "./exercise-detail.hook";

export interface ExerciseDetailProps {
	index: number;
	onRemoveExercise: (index: number) => void;
}

export function ExerciseDetail(props: ExerciseDetailProps) {
	const { index, onRemoveExercise } = props;

	const { name, target, control, sets, handleAddNewSet, handleRemoveSet } =
		useExerciseDetailHook(props);

	return (
		<div className="border rounded-md p-3 flex flex-col gap-2">
			<div className="flex justify-between">
				<div className="flex flex-col">
					<span>{name}</span>
					{target && (
						<small className="text-muted-foreground">
							<b>Target</b>: {target}
						</small>
					)}
				</div>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button aria-haspopup="true" size="icon" variant="ghost">
							<Icon name="dots" className="h-4 w-4 rotate-90" />
							<span className="sr-only">Toggle menu</span>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>Ações</DropdownMenuLabel>

						<DropdownMenuItem onClick={() => onRemoveExercise(index)}>
							Remover exercício
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
			<div>
				<small>Notas:</small>
				<Controller
					control={control}
					name={`exercises.${index}.notes`}
					render={({ field: { value, onChange, name } }) => (
						<Textarea
							value={value}
							onChange={onChange}
							name={name}
							className="w-full"
						/>
					)}
				/>
			</div>
			<div>
				<small>Descanso:</small>
				<Controller
					control={control}
					name={`exercises.${index}.restTime`}
					render={({ field: { value, onChange, name } }) => (
						<Select
							defaultValue="Off"
							onValueChange={onChange}
							name={name}
							value={value}
						>
							<SelectTrigger className="w-[280px]">
								<SelectValue placeholder="Selecione o tempo" />
							</SelectTrigger>
							<SelectContent className="h-[210px]">
								{restTimer.map((time) => (
									<SelectItem key={time} value={time}>
										{time}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					)}
				/>
			</div>
			<Separator className="mt-2 mb-2" />
			<div className="space-y-3">
				<div className="flex flex-row items-center gap-4">
					<div className="uppercase justify-center flex w-12">set</div>
					<div className="uppercase justify-center flex grow-[2] shrink basis-0">
						kg
					</div>
					<div className="uppercase justify-center flex grow-[2] shrink basis-0">
						reps
					</div>
					<div className="w-7 flex justify-center" />
				</div>
				{sets.map((set, setIndex) => (
					<SetRow
						key={set.id}
						setIndex={setIndex}
						exerciseIndex={index}
						shouldDisplayRemoveButton={sets.length > 1}
						onRemoveSet={() => handleRemoveSet(setIndex)}
					/>
				))}

				<Button
					className="w-full "
					variant="secondary"
					onClick={handleAddNewSet}
				>
					<Icon name="plusCircle" className="h-4 w-4 mr-4" />
					Adicionar séries
				</Button>
			</div>
		</div>
	);
}

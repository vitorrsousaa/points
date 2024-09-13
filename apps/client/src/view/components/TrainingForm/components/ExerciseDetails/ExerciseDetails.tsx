import {
	Button,
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
	Icon,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	Separator,
	Textarea,
} from "@shared/ui";
import { Controller } from "react-hook-form";
import { restTimer } from "../../TrainingFormConstants";
import { SetRow } from "../SetRow";
import { useExerciseDetailHook } from "./useExerciseDetails";

export interface ExerciseDetailProps {
	index: number;
	onRemoveExercise: (index: number) => void;
}

export function ExerciseDetail(props: ExerciseDetailProps) {
	const { index, onRemoveExercise } = props;

	const { name, target, control, sets, handleAddNewSet, handleRemoveSet } =
		useExerciseDetailHook(props);

	return (
		<Collapsible
			className="border rounded-lg p-2 sm:p-4 shadow-md flex flex-col gap-4"
			defaultOpen
		>
			<div className="flex justify-between items-start">
				<div className="flex flex-col w-full">
					<span className="text:sm sm:text-lg font-semibold">{name}</span>
					{target && (
						<small className="text-gray-500 mt-1">
							<strong>Target</strong>: {target}
						</small>
					)}
				</div>

				<div className="flex items-center gap-1">
					<CollapsibleTrigger>
						<Button variant="ghost" size="icon">
							<Icon name="double_arrow" className="h-6 w-6" />
						</Button>
					</CollapsibleTrigger>

					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button aria-haspopup="true" size="icon" variant="ghost">
								<Icon name="dots" className="h-5 w-5 rotate-90" />
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
			</div>

			<CollapsibleContent>
				<>
					<div className="space-y-2">
						<div>
							<small className="text-gray-600">Notas:</small>
							<Controller
								control={control}
								name={`exercises.${index}.notes`}
								render={({ field: { value, onChange, name } }) => (
									<Textarea
										value={value}
										onChange={onChange}
										name={name}
										className="w-full mt-1"
									/>
								)}
							/>
						</div>
						<div>
							<small className="text-gray-600">Descanso:</small>
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
										<SelectTrigger className="w-full mt-1">
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
					</div>

					<Separator className="my-4" />

					<div className="space-y-3">
						<div className="flex flex-row items-center gap-4">
							<div className="uppercase flex w-14 justify-center font-semibold text-gray-700">
								SET
							</div>
							<div className="uppercase flex grow-[2] justify-center font-semibold text-gray-700">
								KG
							</div>
							<div className="uppercase flex grow-[2] justify-center font-semibold text-gray-700">
								RPE
							</div>
							<div className="uppercase flex grow-[2] justify-center font-semibold text-gray-700">
								REPS
							</div>
							{sets.length > 1 && <div className="w-7 flex justify-center" />}
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
							className="w-full flex items-center justify-center transition-colors"
							onClick={handleAddNewSet}
						>
							<Icon name="plusCircle" className="h-5 w-5 mr-2" />
							Adicionar séries
						</Button>
					</div>
				</>
			</CollapsibleContent>
		</Collapsible>
	);
}

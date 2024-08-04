import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
	Icon,
	Input,
} from "@shared/ui";
import { Controller } from "react-hook-form";
import { typeOfSets } from "../../training.form.constants";
import { useSetRowHook } from "./set-row.hook";

export interface SetRowProps {
	setIndex: number;
	exerciseIndex: number;
	shouldDisplayRemoveButton: boolean;
	onRemoveSet: () => void;
}

export function SetRow(props: SetRowProps) {
	const { setIndex, exerciseIndex, shouldDisplayRemoveButton, onRemoveSet } =
		props;
	const { control } = useSetRowHook(props);

	return (
		<div className="flex flex-row items-center h-12 gap-4 bg-muted-foreground/5 rounded-md">
			<div className="uppercase justify-center flex w-12">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button aria-haspopup="true" size="icon" variant="secondary">
							<span>W</span>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end" className="px-2 ">
						{typeOfSets.map((type) => (
							<DropdownMenuItem key={type.value}>
								<div className="flex flex-row gap-2 items-center">
									<span
										className="flex items-center justify-center rounded-md border h-[30px] w-[30px] bg-muted/20"
										style={{ color: type.color }}
									>
										{type.value}
									</span>{" "}
									{type.label}
								</div>
							</DropdownMenuItem>
						))}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
			<div className="uppercase justify-center flex grow-[2] shrink basis-0">
				<Controller
					control={control}
					name={`exercises.${exerciseIndex}.sets.${setIndex}.weight`}
					render={({ field: { onChange, ...props } }) => (
						<Input
							type="number"
							className="text-center"
							onChange={(event) => onChange(Number(event.target.value))}
							{...props}
						/>
					)}
				/>
			</div>
			<div className="uppercase justify-center flex grow-[2] shrink basis-0">
				<Controller
					control={control}
					name={`exercises.${exerciseIndex}.sets.${setIndex}.reps`}
					render={({ field: { onChange, ...props } }) => (
						<Input
							type="number"
							className="text-center"
							onChange={(event) => onChange(Number(event.target.value))}
							{...props}
						/>
					)}
				/>
			</div>
			<div className="w-7 flex justify-center">
				{shouldDisplayRemoveButton && (
					<Button
						aria-haspopup="true"
						size="icon"
						variant="ghost"
						onClick={onRemoveSet}
					>
						<Icon name="close" className="h-3 w-3 rotate-90" />
						<span className="sr-only">Remove sets</span>
					</Button>
				)}
			</div>
		</div>
	);
}

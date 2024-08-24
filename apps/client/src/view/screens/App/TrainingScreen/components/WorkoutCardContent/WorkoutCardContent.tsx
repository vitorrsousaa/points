import { CardContent, CardDescription, RenderIfElse } from "@shared/ui";
import { useWorkoutCardContext } from "../WorkoutCard";

export function WorkoutCardContent() {
	const { workout } = useWorkoutCardContext();

	const { description } = workout;

	return (
		<CardContent className="h-full">
			<CardDescription className="text-left">
				<RenderIfElse
					condition={!!description}
					ifRender={description}
					elseRender="Descrição do treino não informada. Adicione uma e visualize aqui."
				/>
			</CardDescription>
		</CardContent>
	);
}

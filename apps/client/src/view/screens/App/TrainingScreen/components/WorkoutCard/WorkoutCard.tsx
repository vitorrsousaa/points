import type { Workout } from "@/entitites/workout";
import type { Status } from "@/utils/types";
import { Card, cn } from "@shared/ui";
import { createContext, useContext } from "react";
import { WorkoutDialog } from "../WorkoutDialog";

interface WorkoutCardProps {
	id: string;
	children: React.ReactNode;
	status?: Status;
	workout: Workout;
}

interface WorkoutCardContextValue {
	id: string;
	status?: Status;
	workout: Workout;
}

const WorkoutCardContext = createContext<WorkoutCardContextValue>(
	{} as WorkoutCardContextValue,
);

function WorkoutCardContextProvider(props: WorkoutCardProps) {
	const { id, children, status, workout } = props;

	return (
		<WorkoutCardContext.Provider value={{ id, status, workout }}>
			{children}
		</WorkoutCardContext.Provider>
	);
}

export function useWorkoutCardContext() {
	const context = useContext(WorkoutCardContext);

	if (!context) {
		throw new Error(
			"useWorkoutCardContext must be used within an WorkoutCardContextProvider",
		);
	}

	return context;
}

export function WorkoutCard(props: WorkoutCardProps) {
	const { id, children, status, workout } = props;

	return (
		<Card
			className={cn(
				"flex flex-col",
				status === "error" && "border-destructive/50 bg-destructive/5",
			)}
		>
			<WorkoutCardContextProvider id={id} status={status} workout={workout}>
				<WorkoutDialog workout={workout}>{children}</WorkoutDialog>
			</WorkoutCardContextProvider>
		</Card>
	);
}

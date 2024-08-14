import type { Status } from "@/utils/types";
import { Card, cn } from "@shared/ui";
import { createContext, useContext } from "react";

interface WorkoutCardProps {
	id: string;
	children: React.ReactNode;
	status?: Status;
}

interface WorkoutCardContextValue {
	id: string;
	status?: Status;
}

const WorkoutCardContext = createContext<WorkoutCardContextValue>(
	{} as WorkoutCardContextValue,
);

function WorkoutCardContextProvider(props: WorkoutCardProps) {
	const { id, children, status } = props;

	return (
		<WorkoutCardContext.Provider value={{ id, status }}>
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
	const { id, children, status } = props;

	return (
		<Card
			className={cn(
				status === "error" && "border-destructive/50 bg-destructive/5",
			)}
		>
			<WorkoutCardContextProvider id={id} status={status}>
				{children}
			</WorkoutCardContextProvider>
		</Card>
	);
}

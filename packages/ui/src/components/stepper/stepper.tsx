import type React from "react";
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react";

import {
	Button,
	type ButtonProps,
	Icon,
	type IconProps,
	ProgressIndicator,
} from "..";

interface StepperContextProps {
	previousStep: () => void;
	nextStep: () => void;
}

interface StepperProps {
	initialStepIndex?: number;
	fixedRenderContent?: React.ReactNode;
	steps: {
		content: React.ReactNode;
	}[];
}

interface StepperLabelsProps {
	labels: Array<{
		icon: IconProps["name"];
		title: string;
		description: string;
		isActive?: boolean;
	}>;
}

export const StepperContext = createContext({} as StepperContextProps);

export function Stepper({
	fixedRenderContent,
	steps,
	initialStepIndex = 0,
}: StepperProps) {
	// const { width } = useWindowDimensions();

	const [currentStepIndex, setCurrentStepIndex] = useState(initialStepIndex);

	const previousStep = useCallback(() => {
		setCurrentStepIndex((prevState) => Math.max(0, prevState - 1));
	}, []);

	const nextStep = useCallback(() => {
		setCurrentStepIndex((prevState) =>
			Math.min(steps.length - 1, prevState + 1),
		);
	}, [steps]);

	// biome-ignore lint/correctness/useExhaustiveDependencies(initialStepIndex): <explanation>
	useEffect(() => {
		() => {
			setCurrentStepIndex(initialStepIndex);
		};
	}, []);

	return (
		<StepperContext.Provider value={{ previousStep, nextStep }}>
			<div className="w-full h-full relative flex items-center max-sm:flex-col-reverse max-sm:gap-20">
				<div className="flex-1">
					{fixedRenderContent && fixedRenderContent}
					{steps[currentStepIndex].content}
				</div>

				<div className="w-full sm:absolute max-sm:top-4 sm:bottom-[-4rem] lg.:bottom-4 max-w-[220px] left-0 right-0 mx-auto">
					<ProgressIndicator
						total={steps.length}
						currentIndex={currentStepIndex}
					/>
				</div>
			</div>
		</StepperContext.Provider>
	);
}

export function useStepper() {
	return useContext(StepperContext);
}

export function StepperHeader({
	title,
	subtitle,
}: {
	title: string;
	subtitle: string;
}) {
	return (
		<div className="flex flex-col items-center gap-2 mb-8 text-center">
			<h3 className="text-3xl font-bold">{title}</h3>
			<span className="text-muted-foreground text-pretty">{subtitle}</span>
		</div>
	);
}

export function StepperContent({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex flex-col justify-center flex-1 gap-6">{children}</div>
	);
}

export function StepperFooter({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex items-center justify-center gap-4 mt-6">
			{children}
		</div>
	);
}

export function StepperPreviousButton({
	onClick,
	...props
}: Omit<ButtonProps, "text">) {
	const { previousStep } = useStepper();

	return (
		<Button
			className="flex-1"
			variant="outline"
			onClick={onClick ?? previousStep}
			{...props}
		>
			Voltar
		</Button>
	);
}

export function StepperNextButton({
	text = "Continuar",
	onClick,
	...props
}: Omit<ButtonProps, "text"> & { text?: string }) {
	const { nextStep } = useStepper();

	return (
		<Button className="flex-1" onClick={onClick ?? nextStep} {...props}>
			{text}
		</Button>
	);
}

export function StepperLabels({ labels }: StepperLabelsProps) {
	return (
		<div className="flex flex-col items-center gap-6 w-full">
			{labels.map((label) => (
				<div
					key={label.title}
					className={`flex items-center gap-4 w-full ${label.isActive ? "opacity-1" : "opacity-50"}`}
				>
					<div className="p-3 border border-gray-400 rounded-xl">
						<Icon name={label.icon} className="h-4 w-4" />
					</div>

					<div>
						<h5 className="text-base font-medium leading-tight">
							{label.title}
						</h5>
						<small className="text-muted-foreground">{label.description}</small>
					</div>
				</div>
			))}
		</div>
	);
}

import { ROUTES } from "@/config/routes";
import { useUpdateSettings } from "@/hooks/settings";
import { porcentageCalculate } from "@/utils/porcentageCalculate";
import {
	Button,
	Card,
	CardFooter,
	CardHeader,
	CardTitle,
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
	Icon,
	Progress,
	RenderIf,
	RenderIfElse,
	Skeleton,
} from "@shared/ui";
import { Link } from "react-router-dom";
import { useOnboarding } from "./useOnboarding";
import { useNavigate } from "@/hooks/navigate";

const COMPLETED_CARD_STYLES = {
	container: "border-green-700 bg-green-100",
	title: "text-green-700",
};

export function Onboarding() {
	const { onboardingData, isLoading } = useOnboarding();

	function renderStep(isCompletedStep: boolean, index: number) {
		if (index === 0) {
			return <SecondStep key={Math.random()} completedStep={isCompletedStep} />;
		}

		return <ThirthStep key={Math.random()} completedStep={isCompletedStep} />;
	}

	function renderLoadingOnboardingCards() {
		return Array.from({ length: 3 }).map(() => (
			<Skeleton key={Math.random()} className="w-full h-40" />
		));
	}

	function renderOnboardingCards() {
		return (
			<>
				<Card className={COMPLETED_CARD_STYLES.container}>
					<CardHeader>
						<CardTitle
							className={`flex flex-col gap-4 font-normal ${COMPLETED_CARD_STYLES.title}`}
						>
							<Icon name="person" className="h-5 w-5" />
							Crie sua conta
						</CardTitle>
					</CardHeader>

					<CompletedCardStepFooter />
				</Card>

				{onboardingData?.steps.map((step, index) => {
					const isCompletedStep = Object.values(step)[0].status === "completed";

					return renderStep(isCompletedStep, index);
				})}
			</>
		);
	}

	return (
		<div className="space-y-4 mb-8">
			<Collapsible className="space-y-4" defaultOpen>
				<header className="flex flex-col md:flex-row items-start md:items-center justify-between">
					<RenderIfElse
						condition={isLoading}
						ifRender={<Skeleton className="h-6 w-80" />}
						elseRender={
							<h2 className="whitespace-nowrap font-semibold text-lg">
								Comece a configurar por aqui
							</h2>
						}
					/>

					<div className="flex flex-row items-center w-full justify-between md:justify-end gap-4 mt-4 md:mt-0">
						<RenderIf
							condition={isLoading}
							render={<Skeleton className="w-[40%] h-2" />}
						/>

						<RenderIf
							condition={Boolean(onboardingData?.enable && !isLoading)}
							render={
								<>
									<Progress
										value={porcentageCalculate(
											Number(onboardingData?.completedSteps.length) + 1,
											Number(onboardingData?.steps.length) + 1,
										)}
										className="w-[40%] h-2"
									/>
									<span className="flex items-center gap-2">
										{Number(onboardingData?.completedSteps.length) + 1} de{" "}
										{Number(onboardingData?.steps.length) + 1}
										<CollapsibleTrigger>
											<Icon name="double_arrow" className="h-6 w-6" />
										</CollapsibleTrigger>
									</span>
								</>
							}
						/>
					</div>
				</header>

				<CollapsibleContent>
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
						<RenderIfElse
							condition={!!isLoading}
							ifRender={renderLoadingOnboardingCards()}
							elseRender={renderOnboardingCards()}
						/>
					</div>
				</CollapsibleContent>
			</Collapsible>
		</div>
	);
}

interface StepProps {
	completedStep: boolean;
}

function SecondStep({ completedStep }: StepProps) {
	const { execute } = useUpdateSettings();

	async function handleClickCompleteStep() {
		execute({
			onboarding: {
				enable: true,
				steps: {
					stepOne: {
						status: "completed",
					},
					stepTwo: {
						status: "pending",
					},
				},
			},
		});
	}

	return (
		<Card className={`${completedStep && COMPLETED_CARD_STYLES.container}`}>
			<CardHeader>
				<CardTitle
					className={`flex flex-col gap-4 font-normal ${
						completedStep && COMPLETED_CARD_STYLES.title
					}`}
				>
					<Icon name="plusCircle" className="h-5 w-5" />
					Adicione seu primeiro atleta
				</CardTitle>
			</CardHeader>

			<RenderIfElse
				condition={completedStep}
				ifRender={<CompletedCardStepFooter />}
				elseRender={
					<CardFooter>
						<Link
							to={ROUTES.NEW_ATHLETE}
							onClick={handleClickCompleteStep}
							className="w-full"
						>
							<Button className="w-full h-8">Começar</Button>
						</Link>
					</CardFooter>
				}
			/>
		</Card>
	);
}

function ThirthStep({ completedStep }: StepProps) {
	const { execute } = useUpdateSettings();

	const { navigate } = useNavigate();

	const DEFAULT_ATHLETE_ID = "1";

	async function handleClickCompleteStep() {
		navigate("NEW_TRAINING", {
			replace: { athleteId: DEFAULT_ATHLETE_ID },
		});
		execute({
			onboarding: {
				enable: true,
				steps: {
					stepOne: {
						status: "completed",
					},
					stepTwo: {
						status: "completed",
					},
				},
			},
		});
	}

	return (
		<Card className={`${completedStep && COMPLETED_CARD_STYLES.container}`}>
			<CardHeader>
				<CardTitle
					className={`flex flex-col gap-4 font-normal ${
						completedStep && COMPLETED_CARD_STYLES.title
					}`}
				>
					<Icon name="lightning" className="h-5 w-5" />
					Crie um treino para o atleta
				</CardTitle>
			</CardHeader>

			<RenderIfElse
				condition={completedStep}
				ifRender={<CompletedCardStepFooter />}
				elseRender={
					<CardFooter>
						<Button className="w-full h-8" onClick={handleClickCompleteStep}>
							Criar
						</Button>
					</CardFooter>
				}
			/>
		</Card>
	);
}

function CompletedCardStepFooter() {
	return (
		<CardFooter
			className={`font-bold justify-between ${COMPLETED_CARD_STYLES.title}`}
		>
			Concluido
			<Icon name="check" className="h-5 w-5" />
		</CardFooter>
	);
}

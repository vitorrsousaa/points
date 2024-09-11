import { useCallback } from "react";
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
	Separator,
	StepperContent,
	StepperFooter,
	StepperHeader,
	StepperNextButton,
	Textarea,
} from "@shared/ui";
import { useFormContext } from "react-hook-form";
import type { SignupFormSchemaTypes } from "../../SignUpFormSchema";
import { useSendQuestion } from "@/hooks/question";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/config/routes";
import toast from "react-hot-toast";

export function ResearchStep() {
	const {
		control,
		formState: { isSubmitting, isLoading },
		getValues,
	} = useFormContext<SignupFormSchemaTypes>();

	const formIsLoading = isSubmitting || isLoading;

	const { send } = useSendQuestion({
		onSuccess: () => {
			toast.success("Conta criada com sucesso!");
		},
	});

	const navigate = useNavigate();

	const handleSendQuestions = useCallback(() => {
		const questions = getValues("steps.researchStep");
		const userId = getValues("userId");
		const questionsMapped = Object.keys(questions).map((question) => ({
			question,
			answer: questions[question as keyof typeof questions],
		}));

		send({
			userId,
			questions: questionsMapped,
		});

		navigate(ROUTES.SIGNIN);
	}, [getValues, navigate, send]);

	return (
		<>
			<StepperHeader
				title="Perguntinhas rápidas"
				subtitle="Conte um pouquinho como você nos conheceu e sobre sua rotina."
			/>

			<StepperContent>
				<FormField
					control={control}
					name="steps.researchStep.leadInidication"
					disabled={formIsLoading}
					render={({ field }) => (
						<FormItem className="w-full">
							<FormLabel>Onde você nos conheceu?</FormLabel>
							<FormControl>
								<Select onValueChange={field.onChange}>
									<SelectTrigger>
										<SelectValue placeholder="Selecione um opção" />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											<SelectLabel>Opções</SelectLabel>
											<SelectItem value="indication">Indicação</SelectItem>
											<SelectItem value="whatsapp">WhatsApp</SelectItem>
											<SelectItem value="google">Google</SelectItem>
											<SelectItem value="instagram">Instagram</SelectItem>
											<SelectItem value="facebook">Facebook</SelectItem>
											<SelectItem value="other">Outro</SelectItem>
										</SelectGroup>
									</SelectContent>
								</Select>
							</FormControl>
							<FormDescription>
								Ficamos felizes de saber como você chegou até nós.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={control}
					name="steps.researchStep.athleteNumber"
					disabled={formIsLoading}
					render={({ field }) => (
						<FormItem className="w-full">
							<FormLabel>
								Quantos alunos aproximadamente você gerencia?
							</FormLabel>
							<FormControl>
								<Select onValueChange={field.onChange}>
									<SelectTrigger>
										<SelectValue placeholder="Números de alunos" />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											<SelectLabel>Alunos</SelectLabel>
											<SelectItem value="0-5">0 - 5</SelectItem>
											<SelectItem value="5-25">5 - 25</SelectItem>
											<SelectItem value="25-50">25 - 50</SelectItem>
											<SelectItem value="50-100">50 - 100</SelectItem>
											<SelectItem value="100+">100+</SelectItem>
										</SelectGroup>
									</SelectContent>
								</Select>
							</FormControl>
							<FormDescription>Não precisa ser o número exato.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={control}
					name="steps.researchStep.challengers"
					disabled={formIsLoading}
					render={({ field }) => (
						<FormItem className="w-full">
							<FormLabel>
								Qual sua maior dificuldade cuidado de seus alunos e treinos?
							</FormLabel>
							<FormControl>
								<Textarea {...field} className="max-h-[80px]" />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</StepperContent>

			<Separator className="mt-8 mb-8" />

			<StepperFooter>
				<StepperNextButton
					text="Finalizar"
					isLoading={formIsLoading}
					onClick={handleSendQuestions}
				/>
			</StepperFooter>
		</>
	);
}

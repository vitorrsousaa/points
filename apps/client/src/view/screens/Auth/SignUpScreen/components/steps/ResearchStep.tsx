import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Label,
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
	StepperPreviousButton,
	Textarea,
} from "@shared/ui";
import { useFormContext } from "react-hook-form";
import { SignupFormSchemaTypes } from "../../SignUpFormSchema";

export function ResearchStep() {
	const { control } = useFormContext<SignupFormSchemaTypes>();

	return (
		<>
			<StepperHeader
				title="Perguntinhas rápidas"
				subtitle="Conte um pouquinho como você nos conheceu e sobre sua rotina."
			/>

			<StepperContent>
				<FormField
					control={control}
					name="steps.researchStep.firstAnswer"
					render={({ field }) => (
						<FormItem className="w-full">
							<FormLabel>Onde você nos conheceu?</FormLabel>
							<FormControl>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
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
					name="steps.researchStep.secondAnswer"
					render={({ field }) => (
						<FormItem className="w-full">
							<FormLabel>
								Quantos alunos aproximadamente você gerencia?
							</FormLabel>
							<FormControl>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
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
					name="steps.researchStep.thirthAnswer"
					render={({ field: { value, onChange, name } }) => (
						<FormItem className="w-full">
							<FormLabel>
								Qual sua maior dificuldade cuidado de seus alunos e treinos?
							</FormLabel>
							<FormControl>
								<Textarea value={value} onChange={onChange} name={name} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</StepperContent>

			<Separator className="mt-8 mb-8" />

			<StepperFooter>
				<StepperPreviousButton />
				<StepperNextButton text="Finalizar" />
			</StepperFooter>
		</>
	);
}

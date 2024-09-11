import type { ResearchQuestion } from "@/entitites/Question";
import { useNavigate } from "@/hooks/navigate";
import { useSendQuestion } from "@/hooks/question";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
	type ResearchStepTypes,
	SIGN_UP_FORM_DEFAULT_VALUES,
	SignUpFormSchema,
	type SignupFormSchemaTypes,
} from "./SignUpFormSchema";

const MAPPED_QUESTIONS: Array<keyof ResearchStepTypes> = [
	"leadInidication",
	"athleteNumber",
	"challengers",
];

export function useSignUpScreen() {
	const form = useForm<SignupFormSchemaTypes>({
		resolver: zodResolver(SignUpFormSchema),
		defaultValues: SIGN_UP_FORM_DEFAULT_VALUES,
		mode: "onChange",
	});

	const { navigate } = useNavigate();

	const { send } = useSendQuestion({
		onSuccess() {
			toast.success("Parabéns, sua conta foi criada!");

			navigate("SIGNIN");
		},
		onError(error) {
			console.error(error);

			toast.error("Ocorreu um erro no envio");
		},
	});

	const handleClickFinishForm = form.handleSubmit(
		async () => {
			const isValid = await form.trigger("steps.researchStep");

			if (isValid) {
				const {
					userId,
					steps: { researchStep },
				} = form.getValues();

				const questionPayload: ResearchQuestion = {
					userId,
					questions: MAPPED_QUESTIONS.map((question) => ({
						question: question,
						answer: researchStep[question],
					})),
				};

				await send(questionPayload);
			}
		},
		(e) => console.log(e),
	);

	return {
		form,
		handleClickFinishForm,
	};
}

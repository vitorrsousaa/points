import { ResearchQuestion } from "@/entitites/Question";
import { useNavigate } from "@/hooks/navigate";
import { useSendQuestion } from "@/hooks/question";
import { safeSessionStorageGetItem } from "@/utils/safeSessionStorageGetItem";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
	ResearchStepTypes,
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
		defaultValues:
			safeSessionStorageGetItem<SignupFormSchemaTypes>("onboarding-form") ??
			SIGN_UP_FORM_DEFAULT_VALUES,
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
				sessionStorage.removeItem("onboarding-form");
			}
		},
		(e) => console.log(e),
	);

	useEffect(() => {
		const { unsubscribe } = form.watch((formData) => {
			sessionStorage.setItem("onboarding-form", JSON.stringify(formData));
		});

		return () => {
			unsubscribe();
			form.setValue("currentStep", "AccountDetailsStep");
		};
	}, [form]);

	return {
		form,
		handleClickFinishForm,
	};
}

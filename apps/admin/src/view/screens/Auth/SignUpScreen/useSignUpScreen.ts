import { ROUTES } from "@/config/routes";
import { useSignup } from "@/hooks/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
	SIGN_UP_FORM_DEFAULT_VALUES,
	SignUpFormSchema,
	type SignupFormSchemaTypes,
} from "./SignUpFormSchema";

export function useSignUpScreen() {
	const methods = useForm<SignupFormSchemaTypes>({
		resolver: zodResolver(SignUpFormSchema),
		defaultValues: SIGN_UP_FORM_DEFAULT_VALUES,
	});

	const { control, handleSubmit: hookFormSubmit } = methods;

	const { isCreatingAccount, signup } = useSignup();

	const navigate = useNavigate();

	const handleSubmit = hookFormSubmit(async (data) => {
		const ROLE = ["COACH"];
		const newUser = { ...data, role: ROLE };
		console.log(newUser);
		await toast.promise(signup(newUser), {
			loading: "Criando conta...",
			success: "Confirme sua conta no email informado!",
			error: "Tivemos um erro ao criar sua conta, tente novamente!",
		});

		navigate(ROUTES.CONFIRMATION_ACCOUNT);
	});

	return {
		methods,
		isCreatingAccount,
		control,
		handleSubmit,
	};
}

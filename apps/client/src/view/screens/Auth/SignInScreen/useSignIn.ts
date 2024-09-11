import { ROUTES } from "@/config/routes";
import { useAuth, useSignin } from "@/hooks/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
	SIGN_IN_FORM_DEFAULT_VALUES,
	SignInFormSchema,
	type SigninFormSchemaTypes,
} from "./SignInFormSchema";

export function useSignIn() {
	const methods = useForm<SigninFormSchemaTypes>({
		resolver: zodResolver(SignInFormSchema),
		defaultValues: SIGN_IN_FORM_DEFAULT_VALUES,
	});

	const { control, handleSubmit: hookFormSubmit, setError } = methods;

	const navigate = useNavigate();

	const { signin } = useAuth();

	const { isLoggingAccount, signin: apiSignin } = useSignin();

	const handleSubmit = hookFormSubmit(async (data) => {
		try {
			const { accessToken } = await apiSignin(data);
			signin(accessToken);
			navigate(ROUTES.DASHBOARD);

			toast.success("Bem-vindo de volta!");
		} catch (error) {
			toast.error("Credenciais inválidas");
			setError("password", {
				message: "Email ou senha inválido",
			});
		}
	});

	return {
		control,
		isLoggingAccount,
		handleSubmit,
		methods,
	};
}

import { ROUTES } from "@/config/routes";
import { useSignup } from "@/hooks/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as z from "zod";

const formSchema = z.object({
	firstName: z
		.string()
		.min(2, "O nome deve conter ao menos 2 caracteres.")
		.max(50),
	lastName: z
		.string()
		.min(2, "O nome deve conter ao menos 2 caracteres.")
		.max(50),
	email: z
		.string({ message: "O e-mail é obrigatório." })
		.email("Formato de e-mail inválido."),
	password: z.string().min(6, "A senha deve conter ao menos 6 caracteres."),
});

type SignupFormSchema = z.infer<typeof formSchema>;

export function useSignupHook() {
	const methods = useForm<SignupFormSchema>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			firstName: "",
			lastName: "",
			email: "",
			password: "",
		},
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

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
	SIGN_UP_FORM_DEFAULT_VALUES,
	SignUpFormSchema,
	type SignupFormSchemaTypes,
} from "./SignUpFormSchema";

export function useSignUpScreen() {
	const methods = useForm<SignupFormSchemaTypes>({
		resolver: zodResolver(SignUpFormSchema),
		defaultValues: SIGN_UP_FORM_DEFAULT_VALUES,
		mode: "onChange",
	});

	return {
		methods,
	};
}

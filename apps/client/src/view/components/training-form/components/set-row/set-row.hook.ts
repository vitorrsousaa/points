import { useFormContext } from "react-hook-form";
import type { TTrainingFormSchema } from "../../training-form.schema";
import type { SetRowProps } from "./set-row";

export function useSetRowHook(_props: SetRowProps) {
	const { control } = useFormContext<TTrainingFormSchema>();

	return { control };
}

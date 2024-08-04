import { useCallback, useMemo } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import type { TTrainingFormSchema } from "../../training-form.schema";
import type { SetRowProps } from "./set-row";

export function useSetRowHook(props: SetRowProps) {
	const { setIndex, exerciseIndex } = props;

	const { control } = useFormContext<TTrainingFormSchema>();

	return { control };
}

import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import type { TTrainingFormSchema } from "../../training-form.schema";
import type { SetRowProps } from "./set-row";

export function useSetRowHook(props: SetRowProps) {
	const { setIndex, exerciseIndex } = props;
	const { control } = useFormContext<TTrainingFormSchema>();

	const { fields, update } = useFieldArray({
		control,
		name: `exercises.${exerciseIndex}.sets`,
	});

	const updateType = React.useCallback(
		(type: "W" | "F" | "T") => {
			const oldSet = fields[setIndex];

			if (!oldSet) return;
			update(setIndex, { ...oldSet, type });
		},
		[fields, setIndex, update],
	);

	const typeOfSet = React.useMemo(
		() => fields[setIndex]?.type,
		[fields, setIndex],
	);

	return { control, typeOfSet, updateType };
}

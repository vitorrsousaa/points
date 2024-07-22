import { useCallback, useReducer } from "react";
import { Input, type InputProps } from "./input";

interface MoneyInputProps
	extends Omit<InputProps, "onChange" | "value" | "text"> {
	onChange: (value: number) => void;
	value: number;
	moneyFormatter: (value: number) => string;
}

export function MoneyInput(props: MoneyInputProps) {
	const {
		value: initialValue,
		onChange,
		moneyFormatter,
		...inputProps
	} = props;

	const [value, setValue] = useReducer(
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		(_reducer: any, next: string) => {
			const digits = next.replace(/\D/g, "");
			return moneyFormatter(Number(digits) / 100);
		},
		moneyFormatter(initialValue || 0),
	);

	const handleInputChange = useCallback<
		React.ChangeEventHandler<HTMLInputElement>
	>(
		(ev) => {
			setValue(ev.target.value);

			const digits = ev.target.value.replace(/\D/g, "");
			const realValue = Number(digits) / 100;
			onChange(realValue);
		},
		[onChange],
	);

	return (
		<Input
			{...inputProps}
			type="text"
			onChange={handleInputChange}
			value={value}
		/>
	);
}

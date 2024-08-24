export function porcentageCalculate(initialValue: number, endValue: number) {
	if (initialValue === 0) {
		throw new Error("O valor total não pode ser zero.");
	}

	return (initialValue / endValue) * 100;
}

const moneyFormatter = Intl.NumberFormat("pt-BR", {
	currency: "BRL",
	currencyDisplay: "symbol",
	currencySign: "standard",
	style: "currency",
	minimumFractionDigits: 2,
	maximumFractionDigits: 2,
});

export function formatMoney(value: number) {
	return moneyFormatter.format(value);
}

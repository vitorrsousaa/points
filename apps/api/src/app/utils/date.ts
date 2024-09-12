export function getDateInTheLastMonth(monthsAgo = 1): Date {
	const LAST_MONTH_IN_THE_YEAR = 11;

	const now = new Date();
	const currentDay = now.getDate();
	const currentMonth = now.getMonth();
	const currentYear = now.getFullYear();

	const lastMonth =
		currentMonth === 0 ? LAST_MONTH_IN_THE_YEAR : currentMonth - monthsAgo;
	const lastYear = currentMonth === 0 ? currentYear - 1 : currentYear;

	const firstDayOfCurrentMonth = new Date(currentYear, currentMonth, 1);
	const dateEndOfLastMonth = new Date(firstDayOfCurrentMonth.getTime() - 1);
	const adjustedDay = Math.min(currentDay, dateEndOfLastMonth.getDate());

	return new Date(lastYear, lastMonth, adjustedDay);
}

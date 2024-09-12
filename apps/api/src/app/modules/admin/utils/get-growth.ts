import { getDateInTheLastMonth } from "@application/utils/date";

type AnyObject = Record<string, unknown> & { createdAt: string };

export function getGrowth(
	users: AnyObject[],
	period: number,
): { length: number; growth: string } {
	const DEFAULT_MINOR_GROWTH = Number(0).toFixed(2);
	const DEFAULT_MAJOR_GROWTH = Number(100).toFixed(2);

	const hasUsers = users.length > 0;

	const lengthUsers = users.length;

	if (!hasUsers) {
		return {
			length: lengthUsers,
			growth: DEFAULT_MINOR_GROWTH,
		};
	}

	const dateEndOfLastMonth = getDateInTheLastMonth(period);

	const allUsersCreatedUpToTheLastMonth = users.filter((user) => {
		const createdAt = new Date(user.createdAt);

		return createdAt.getTime() <= dateEndOfLastMonth.getTime();
	});

	const allUsersCreatedAfterTheLastMonth = users.filter((user) => {
		const createdAt = new Date(user.createdAt);

		return createdAt.getTime() > dateEndOfLastMonth.getTime();
	});

	const previousMonthCount = allUsersCreatedUpToTheLastMonth.length;
	const currentMonthCount = allUsersCreatedAfterTheLastMonth.length;

	if (previousMonthCount === 0 && currentMonthCount === 0)
		return {
			length: lengthUsers,
			growth: DEFAULT_MINOR_GROWTH,
		};

	if (previousMonthCount === 0 && currentMonthCount > 0)
		return {
			length: lengthUsers,
			growth: DEFAULT_MAJOR_GROWTH,
		};

	const usersGrowth =
		((currentMonthCount - previousMonthCount) / previousMonthCount) * 100;

	return {
		length: lengthUsers,
		growth: usersGrowth.toFixed(2),
	};
}

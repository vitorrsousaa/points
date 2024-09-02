import type { IAthleteRepository } from "@application/database/repositories/athlete";
import type { ICoachRepository } from "@application/database/repositories/coach";
import type { IService } from "@application/interfaces/service";
import { CoachNotFound } from "@application/shared/errors/coach-not-found";
import { getDateInTheLastMonth } from "@application/utils/date";
import * as z from "zod";

export const GetAthleteGrowthInputServiceSchema = z.object({
	coachId: z.string().uuid(),
});

export type TGetAthleteGrowth = z.infer<
	typeof GetAthleteGrowthInputServiceSchema
>;

export type IGetAthleteGrowthInput = TGetAthleteGrowth;

export interface IGetAthleteGrowthOutput {
	growth: string;
	activeGrowth: string;
}

export type IGetAthleteGrowthService = IService<
	IGetAthleteGrowthInput,
	IGetAthleteGrowthOutput
>;

export class GetAthleteGrowthService implements IGetAthleteGrowthService {
	constructor(
		private readonly coachRepository: ICoachRepository,
		private readonly athleteRepository: IAthleteRepository,
	) {}

	async execute(
		getAthleteGrowthInput: IGetAthleteGrowthInput,
	): Promise<IGetAthleteGrowthOutput> {
		const { coachId } = getAthleteGrowthInput;

		const coach = await this.coachRepository.getById(coachId);

		if (!coach) {
			throw new CoachNotFound();
		}

		const athletes = await this.athleteRepository.getAllByCoachId(coachId);

		const DEFAULT_MINOR_GROWTH = Number(0).toFixed(2);
		const DEFAULT_MAJOR_GROWTH = Number(100).toFixed(2);

		if (athletes.length === 0)
			return {
				growth: DEFAULT_MINOR_GROWTH,
				activeGrowth: DEFAULT_MINOR_GROWTH,
			};

		const dateEndOfLastMonth = getDateInTheLastMonth();

		const allAthletesCreatedUpToTheLastMonth = athletes.filter((athlete) => {
			const createdAt = new Date(athlete.createdAt);

			return createdAt.getTime() <= dateEndOfLastMonth.getTime();
		});

		const allAthletesCreatedAfterTheLastMonth = athletes.filter((athlete) => {
			const createdAt = new Date(athlete.createdAt);

			return createdAt.getTime() > dateEndOfLastMonth.getTime();
		});

		const previousMonthCount = allAthletesCreatedUpToTheLastMonth.length;
		const currentMonthCount = allAthletesCreatedAfterTheLastMonth.length;

		if (previousMonthCount === 0 && currentMonthCount === 0)
			return {
				growth: DEFAULT_MINOR_GROWTH,
				activeGrowth: DEFAULT_MINOR_GROWTH,
			};

		const activeAthletesUpToTheLastMonth =
			allAthletesCreatedUpToTheLastMonth.filter((athlete) => athlete.isActive);
		const activeAthletesAfterTheLastMonth =
			allAthletesCreatedAfterTheLastMonth.filter((athlete) => athlete.isActive);

		const activeAthletesPreviousMonthCount =
			activeAthletesUpToTheLastMonth.length;
		const activeAthletesCurrentMonthCount =
			activeAthletesAfterTheLastMonth.length;

		if (previousMonthCount === 0)
			return {
				growth: DEFAULT_MAJOR_GROWTH,
				activeGrowth: DEFAULT_MAJOR_GROWTH,
			};

		const athletesGrowth =
			((currentMonthCount - previousMonthCount) / previousMonthCount) * 100;

		const activeAthletesGrowth =
			((activeAthletesCurrentMonthCount - activeAthletesPreviousMonthCount) /
				activeAthletesPreviousMonthCount) *
			100;

		return {
			growth: athletesGrowth.toFixed(2),
			activeGrowth: activeAthletesGrowth.toFixed(2),
		};
	}
}

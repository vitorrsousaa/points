import type { IAthleteRepository } from "@application/database/repositories/athlete";
import type { IUserRepository } from "@application/database/repositories/user";
import type { IService } from "@application/interfaces/service";
import { CoachNotFound } from "@application/shared/errors/coach-not-found";
import * as z from "zod";
import { AthleteNotFound } from "../../errors/athlete-not-found";
import { CoachNotAuthorized } from "../../errors/coach-not-authorized";
import { UserShouldBeCoach } from "../../errors/user-not-coach";

export const CreateInputServiceSchema = z.object({
	coachId: z.string().uuid(),
	athleteId: z.string().uuid(),
});

export type TCreate = z.infer<typeof CreateInputServiceSchema>;

export type ICreateInput = TCreate;

export interface ICreateOutput {
	name: string;
}

export type ICreateService = IService<ICreateInput, ICreateOutput>;

export class CreateService implements ICreateService {
	constructor(
		private readonly userRepository: IUserRepository,
		private readonly athleteRepository: IAthleteRepository,
	) {}

	async execute(createInput: ICreateInput): Promise<ICreateOutput> {
		const { coachId, athleteId } = createInput;

		const coach = await this.userRepository.getById(coachId);

		if (!coach) throw new CoachNotFound();

		const isCoach = coach.role.includes("COACH");

		if (!isCoach) throw new UserShouldBeCoach();

		const athlete = await this.athleteRepository.getById(athleteId);

		if (!athlete) throw new AthleteNotFound();

		const athleteIsOwnByCoach = Boolean(athlete.coachId === coachId);

		if (!athleteIsOwnByCoach) throw new CoachNotAuthorized();

		return {
			name: createInput.name,
		};
	}
}

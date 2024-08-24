import type { IAthleteRepository } from "@application/database/repositories/athlete";
import type { IUserRepository } from "@application/database/repositories/user";
import type { IWorkoutRepository } from "@application/database/repositories/workout";
import type { IService } from "@application/interfaces/service";
import { CoachNotFound } from "@application/shared/errors/coach-not-found";
import { CreateWorkoutInputSchema, type Workout } from "@core/domain/workout";
import * as z from "zod";
import { AthleteNotFound } from "../../errors/athlete-not-found";
import { CoachNotAuthorized } from "../../errors/coach-not-authorized";
import { UserShouldBeCoach } from "../../errors/user-not-coach";
import { getWorkoutVolume } from "../../functions/get-workout-volume";

export const CreateInputServiceSchema = z.object({
	coachId: z.string().uuid(),
	athleteId: z.string(),
	workout: CreateWorkoutInputSchema.omit({ volume: true }),
});

export type TCreate = z.infer<typeof CreateInputServiceSchema>;

export type ICreateInput = TCreate;

export type ICreateOutput = Workout;

export type ICreateService = IService<ICreateInput, ICreateOutput>;

export class CreateService implements ICreateService {
	constructor(
		private readonly userRepository: IUserRepository,
		private readonly athleteRepository: IAthleteRepository,
		private readonly workoutRepository: IWorkoutRepository,
	) {}

	async execute(createInput: ICreateInput): Promise<ICreateOutput> {
		const { coachId, athleteId, workout } = createInput;

		const coach = await this.userRepository.getById(coachId);

		if (!coach) throw new CoachNotFound();

		const isCoach = coach.role.includes("COACH");

		if (!isCoach) throw new UserShouldBeCoach();

		const athlete = await this.athleteRepository.getById(athleteId);

		if (!athlete) throw new AthleteNotFound();

		console.log("athlete", athlete);

		const athleteIsOwnByCoach = Boolean(athlete.coachId === coachId);

		if (!athleteIsOwnByCoach) throw new CoachNotAuthorized();

		const volume = getWorkoutVolume(workout.exercises);

		const result = await this.workoutRepository.create({
			coachId,
			athleteId,
			...workout,
			volume,
		});

		return result;
	}
}

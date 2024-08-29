import type { IWorkoutRepository } from "@application/database/repositories/workout";
import type { IService } from "@application/interfaces/service";
import type { Workout } from "@core/domain/workout";
import * as z from "zod";

export const GetAllByAthleteIdInputServiceSchema = z.object({
	athleteId: z.string(),
	status: z.enum(["active"]).optional(),
});

export type TGetAllByAthleteId = z.infer<
	typeof GetAllByAthleteIdInputServiceSchema
>;

export type IGetAllByAthleteIdInput = TGetAllByAthleteId;

export type IGetAllByAthleteIdOutput = Workout[];

export type IGetAllByAthleteIdService = IService<
	IGetAllByAthleteIdInput,
	IGetAllByAthleteIdOutput
>;

export class GetAllByAthleteIdService implements IGetAllByAthleteIdService {
	constructor(private readonly workoutRepository: IWorkoutRepository) {}

	async execute(
		getAllByAthleteIdInput: IGetAllByAthleteIdInput,
	): Promise<IGetAllByAthleteIdOutput> {
		if (getAllByAthleteIdInput.status === "active") {
			return this.workoutRepository.getAllActiveByAthleteId(
				getAllByAthleteIdInput.athleteId,
			);
		}

		return this.workoutRepository.getAllByAthleteId(
			getAllByAthleteIdInput.athleteId,
		);
	}
}

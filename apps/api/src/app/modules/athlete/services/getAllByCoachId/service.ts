import type { IAthleteRepository } from "@application/database/repositories/athlete";
import type { IService } from "@application/interfaces/service";
import type { Athlete } from "@core/domain/athlete";
import * as z from "zod";

export const GetAllByCoachIdInputServiceSchema = z.object({
	coachId: z.string().uuid(),
});

export type TGetAllByCoachId = z.infer<
	typeof GetAllByCoachIdInputServiceSchema
>;

export type IGetAllByCoachIdInput = TGetAllByCoachId;

export type IGetAllByCoachIdOutput = Athlete[];

export type IGetAllByCoachIdService = IService<
	IGetAllByCoachIdInput,
	IGetAllByCoachIdOutput
>;

export class GetAllByCoachIdService implements IGetAllByCoachIdService {
	constructor(private readonly athleteRepository: IAthleteRepository) {}

	async execute(
		getAllByCoachIdInput: IGetAllByCoachIdInput,
	): Promise<IGetAllByCoachIdOutput> {
		const { coachId } = getAllByCoachIdInput;
		return this.athleteRepository.getAllByCoachId(coachId);
	}
}

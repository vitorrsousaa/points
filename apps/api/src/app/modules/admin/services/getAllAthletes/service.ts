import type { IUserRepository } from "@application/database/repositories/user";
import type { IService } from "@application/interfaces/service";
import * as z from "zod";
import { UserNotAdmin } from "../../errors/user-not-admin";
import { UserNotFound } from "../../errors/user-not-found";
import { getGrowth } from "../../utils/get-growth";
import { userIsAdmin } from "../../utils/user-is-admin";

export const GetAllAthletesInputServiceSchema = z.object({
	userId: z.string().uuid(),
	period: z
		.string()
		.transform((val) => {
			const num = Number(val);
			if (Number.isNaN(num) || !Number.isInteger(num) || num <= 0) {
				throw new Error("Invalid number");
			}
			return num;
		})
		.default("1"),
});

export type TGetAllAthletes = z.infer<typeof GetAllAthletesInputServiceSchema>;

export type IGetAllAthletesInput = TGetAllAthletes;

export type IGetAllAthletesOutput = {
	length: number;
	growth: string;
};

export type IGetAllAthletesService = IService<
	IGetAllAthletesInput,
	IGetAllAthletesOutput
>;

export class GetAllAthletesService implements IGetAllAthletesService {
	constructor(private readonly userRepository: IUserRepository) {}

	async execute(
		getAllAthletesInput: IGetAllAthletesInput,
	): Promise<IGetAllAthletesOutput> {
		const user = await this.userRepository.getById(getAllAthletesInput.userId);

		if (!user) {
			throw new UserNotFound();
		}

		const isAdmin = userIsAdmin(user);

		if (!isAdmin) {
			throw new UserNotAdmin();
		}

		const users = await this.userRepository.getAll();

		const athletes = users.filter((user) => user.role.includes("ATHLETE"));

		const growth = getGrowth(athletes, getAllAthletesInput.period);

		return growth;
	}
}

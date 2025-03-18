import type { IUserRepository } from "@application/database/repositories/user";
import type { IService } from "@application/interfaces/service";
import * as z from "zod";
import { UserNotAdmin } from "../../errors/user-not-admin";
import { UserNotFound } from "../../errors/user-not-found";
import { getGrowth } from "../../utils/get-growth";
import { userIsAdmin } from "../../utils/user-is-admin";

export const GetAllCoachesInputServiceSchema = z.object({
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

export type TGetAllCoaches = z.infer<typeof GetAllCoachesInputServiceSchema>;

export type IGetAllCoachesInput = TGetAllCoaches;

export type IGetAllCoachesOutput = {
	length: number;
	growth: string;
};

export type IGetAllCoachesService = IService<
	IGetAllCoachesInput,
	IGetAllCoachesOutput
>;

export class GetAllCoachesService implements IGetAllCoachesService {
	constructor(private readonly userRepository: IUserRepository) {}

	async execute(
		getAllCoachesInput: IGetAllCoachesInput,
	): Promise<IGetAllCoachesOutput> {
		const user = await this.userRepository.getById(getAllCoachesInput.userId);

		if (!user) {
			throw new UserNotFound();
		}

		const isAdmin = userIsAdmin(user);

		if (!isAdmin) {
			throw new UserNotAdmin();
		}

		const users = await this.userRepository.getAll();

		const coaches = users.filter((user) => user.role.includes("COACH"));

		const growth = getGrowth(coaches, getAllCoachesInput.period);

		return growth;
	}
}

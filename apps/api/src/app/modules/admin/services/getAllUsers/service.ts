import type { IUserRepository } from "@application/database/repositories/user";
import type { IService } from "@application/interfaces/service";
import * as z from "zod";
import { UserNotAdmin } from "../../errors/user-not-admin";
import { UserNotFound } from "../../errors/user-not-found";
import { getGrowth } from "../../utils/get-growth";
import { userIsAdmin } from "../../utils/user-is-admin";

export const GetAllUsersInputServiceSchema = z.object({
	userId: z.string().uuid(),
	period: z.number().int().positive().default(1),
});

export type TGetAllUsers = z.infer<typeof GetAllUsersInputServiceSchema>;

export type IGetAllUsersInput = TGetAllUsers;

export type IGetAllUsersOutput = {
	length: number;
	growth: string;
};

export type IGetAllUsersService = IService<
	IGetAllUsersInput,
	IGetAllUsersOutput
>;

export class GetAllUsersService implements IGetAllUsersService {
	constructor(private readonly userRepository: IUserRepository) {}

	async execute(
		getAllUsersInput: IGetAllUsersInput,
	): Promise<IGetAllUsersOutput> {
		const user = await this.userRepository.getById(getAllUsersInput.userId);

		if (!user) {
			throw new UserNotFound();
		}

		const isAdmin = userIsAdmin(user);

		if (!isAdmin) {
			throw new UserNotAdmin();
		}

		const users = await this.userRepository.getAll();

		const growth = getGrowth(users, getAllUsersInput.period);

		return growth;
	}
}

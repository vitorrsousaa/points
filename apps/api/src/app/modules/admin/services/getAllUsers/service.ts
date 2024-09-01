import type { IUserRepository } from "@application/database/repositories/user";
import type { IService } from "@application/interfaces/service";
import * as z from "zod";
import { UserNotFound } from "../../errors/user-not-found";
import { userIsAdmin } from "../../utils/user-is-admin";
import { UserNotAdmin } from "../../errors/user-not-admin";

export const GetAllUsersInputServiceSchema = z.object({
	userId: z.string().uuid(),
	period: z.number().int().positive(),
});

export type TGetAllUsers = z.infer<typeof GetAllUsersInputServiceSchema>;

export type IGetAllUsersInput = TGetAllUsers;

export type IGetAllUsersOutput = {
	current: number;
	period: number;
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

		// buscar todos os usuários cadastrados

		return {
			current: 0,
			period: 0,
		};
	}
}

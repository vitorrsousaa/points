import type { IUserRepository } from "@application/database/repositories/user";
import type { IService } from "@application/interfaces/service";
import type { TRole } from "@core/domain/role";
import * as z from "zod";
import { UserNotFound } from "../../errors/user-not-found";

export const ProfileInputServiceSchema = z.object({
	userId: z.string().uuid(),
});

export type TProfile = z.infer<typeof ProfileInputServiceSchema>;

export type IProfileInput = TProfile;

export interface IProfileOutput {
	name: string;
	email: string;
	role: TRole;
	id: string;
}

export type IProfileService = IService<IProfileInput, IProfileOutput>;

export class ProfileService implements IProfileService {
	constructor(private readonly userRepository: IUserRepository) {}

	async execute(profileInput: IProfileInput): Promise<IProfileOutput> {
		const { userId } = profileInput;

		const profile = await this.userRepository.getById(userId);

		if (!profile) {
			throw new UserNotFound();
		}

		return profile;
	}
}

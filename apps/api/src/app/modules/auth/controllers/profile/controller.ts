import type { IController } from "@application/interfaces/controller";
import type { IRequest, IResponse } from "@application/interfaces/http";
import { errorHandler } from "@application/utils/error-handler";
import { missingFields } from "@application/utils/missing-fields";
import {
	type IProfileService,
	ProfileInputServiceSchema,
} from "../../services/profile";

export class ProfileController implements IController {
	constructor(private readonly profileService: IProfileService) {}
	async handle(request: IRequest): Promise<IResponse> {
		try {
			const [status, parsedBody] = missingFields(ProfileInputServiceSchema, {
				userId: request.userId,
			});

			if (!status) return parsedBody;

			const service = await this.profileService.execute(parsedBody);

			return {
				statusCode: 200,
				body: service,
			};
		} catch (error) {
			return errorHandler(error);
		}
	}
}

import type { IController } from "@application/interfaces/controller";
import type { IRequest, IResponse } from "@application/interfaces/http";
import { errorHandler } from "@application/utils/error-handler";
import { missingFields } from "@application/utils/missing-fields";
import {
	GetByUserInputServiceSchema,
	type IGetByUserService,
} from "../../services/getByUser";

export class GetByUserIdController implements IController {
	constructor(private readonly getByUserService: IGetByUserService) {}
	async handle(request: IRequest): Promise<IResponse> {
		try {
			const [status, parsedBody] = missingFields(GetByUserInputServiceSchema, {
				userId: request.userId,
			});

			if (!status) return parsedBody;

			const service = await this.getByUserService.execute(parsedBody);

			return {
				statusCode: 200,
				body: service,
			};
		} catch (error) {
			return errorHandler(error);
		}
	}
}

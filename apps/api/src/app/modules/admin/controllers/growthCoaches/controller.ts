import type { IController } from "@application/interfaces/controller";
import type { IRequest, IResponse } from "@application/interfaces/http";
import { errorHandler } from "@application/utils/error-handler";
import { missingFields } from "@application/utils/missing-fields";
import {
	GetAllCoachesInputServiceSchema,
	type IGetAllCoachesService,
} from "../../services/getAllCoaches";

export class GrowthCoachesController implements IController {
	constructor(private readonly service: IGetAllCoachesService) {}
	async handle(request: IRequest): Promise<IResponse> {
		try {
			const [status, parsedBody] = missingFields(
				GetAllCoachesInputServiceSchema,
				{
					userId: request.userId,
					period: request.queryParams.period,
				},
			);

			if (!status) return parsedBody;

			const service = await this.service.execute(parsedBody);

			return {
				statusCode: 200,
				body: service,
			};
		} catch (error) {
			return errorHandler(error);
		}
	}
}

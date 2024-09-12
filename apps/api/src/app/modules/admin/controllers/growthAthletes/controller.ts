import type { IController } from "@application/interfaces/controller";
import type { IRequest, IResponse } from "@application/interfaces/http";
import { errorHandler } from "@application/utils/error-handler";
import { missingFields } from "@application/utils/missing-fields";
import {
	GetAllAthletesInputServiceSchema,
	type IGetAllAthletesService,
} from "../../services/getAllAthletes";

export class GrowthAthletesController implements IController {
	constructor(private readonly service: IGetAllAthletesService) {}
	async handle(request: IRequest): Promise<IResponse> {
		try {
			const [status, parsedBody] = missingFields(
				GetAllAthletesInputServiceSchema,
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

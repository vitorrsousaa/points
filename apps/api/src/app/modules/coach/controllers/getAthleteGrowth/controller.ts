import type { IController } from "@application/interfaces/controller";
import type { IRequest, IResponse } from "@application/interfaces/http";
import { errorHandler } from "@application/utils/error-handler";
import { missingFields } from "@application/utils/missing-fields";
import {
	GetAthleteGrowthInputServiceSchema,
	type IGetAthleteGrowthService,
} from "../../services/getAthleteGrowth";

export class GetAthleteGrowthController implements IController {
	constructor(private readonly service: IGetAthleteGrowthService) {}
	async handle(request: IRequest): Promise<IResponse> {
		try {
			const [status, parsedBody] = missingFields(
				GetAthleteGrowthInputServiceSchema,
				{ coachId: request.userId },
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

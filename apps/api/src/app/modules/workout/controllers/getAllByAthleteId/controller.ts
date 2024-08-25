import type { IController } from "@application/interfaces/controller";
import type { IRequest, IResponse } from "@application/interfaces/http";
import { errorHandler } from "@application/utils/error-handler";
import { missingFields } from "@application/utils/missing-fields";
import {
	GetAllByAthleteIdInputServiceSchema,
	type IGetAllByAthleteIdService,
} from "../../services/getAllByAthleteId";

export class GetAllByAthleteIdController implements IController {
	constructor(private readonly getAllService: IGetAllByAthleteIdService) {}
	async handle(request: IRequest): Promise<IResponse> {
		try {
			const { athleteId } = request.params;

			const [status, parsedBody] = missingFields(
				GetAllByAthleteIdInputServiceSchema,
				{ athleteId, status: request.queryParams.status },
			);

			if (!status) return parsedBody;

			const service = await this.getAllService.execute(parsedBody);

			return {
				statusCode: 200,
				body: service,
			};
		} catch (error) {
			return errorHandler(error);
		}
	}
}

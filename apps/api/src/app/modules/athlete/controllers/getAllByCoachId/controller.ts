import type { IController } from "@application/interfaces/controller";
import type { IRequest, IResponse } from "@application/interfaces/http";
import { errorHandler } from "@application/utils/error-handler";
import { missingFields } from "@application/utils/missing-fields";
import {
	GetAllByCoachIdInputServiceSchema,
	type IGetAllByCoachIdService,
} from "../../services/getAllByCoachId";

export class GetAllByCoachIdController implements IController {
	constructor(private readonly getAllByCoachId: IGetAllByCoachIdService) {}
	async handle(request: IRequest): Promise<IResponse> {
		try {
			const { coachId } = request.params;

			const [status, parsedBody] = missingFields(
				GetAllByCoachIdInputServiceSchema,
				{
					coachId,
				},
			);

			if (!status) return parsedBody;

			const service = await this.getAllByCoachId.execute(parsedBody);

			return {
				statusCode: 200,
				body: service,
			};
		} catch (error) {
			return errorHandler(error);
		}
	}
}

import type { IController } from "@application/interfaces/controller";
import type { IRequest, IResponse } from "@application/interfaces/http";
import { errorHandler } from "@application/utils/error-handler";
import { missingFields } from "@application/utils/missing-fields";
import {
	GetAllWorkoutReviewInputServiceSchema,
	type IGetAllWorkoutReviewService,
} from "../../services/getAllWorkoutReview";

export class GetAllWorkoutReviewController implements IController {
	constructor(private readonly service: IGetAllWorkoutReviewService) {}
	async handle(request: IRequest): Promise<IResponse> {
		try {
			const { athleteId, coachId, reviewed, limit } = request.queryParams;

			const [status, parsedBody] = missingFields(
				GetAllWorkoutReviewInputServiceSchema,
				{
					athleteId,
					coachId,
					reviewed,
					limit,
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

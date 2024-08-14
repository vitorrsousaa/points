import type { IController } from "@application/interfaces/controller";
import type { IRequest, IResponse } from "@application/interfaces/http";
import { errorHandler } from "@application/utils/error-handler";
import { missingFields } from "@application/utils/missing-fields";
import {
	DeleteInputServiceSchema,
	type IDeleteService,
} from "../../services/delete";

export class DeleteController implements IController {
	constructor(private readonly deleteService: IDeleteService) {}
	async handle(request: IRequest): Promise<IResponse> {
		const { athleteId, workoutId } = request.queryParams;
		try {
			const [status, parsedBody] = missingFields(DeleteInputServiceSchema, {
				coachId: request.userId,
				athleteId,
				workoutId,
			});

			if (!status) return parsedBody;

			await this.deleteService.execute(parsedBody);

			return {
				statusCode: 201,
				body: null,
			};
		} catch (error) {
			return errorHandler(error);
		}
	}
}

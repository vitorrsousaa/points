import type { IController } from "@application/interfaces/controller";
import type { IRequest, IResponse } from "@application/interfaces/http";
import { errorHandler } from "@application/utils/error-handler";
import { missingFields } from "@application/utils/missing-fields";
import {
	CreateInputServiceSchema,
	type ICreateService,
} from "../../services/create";

export class CreateController implements IController {
	constructor(private readonly createService: ICreateService) {}
	async handle(request: IRequest): Promise<IResponse> {
		try {
			const [status, parsedBody] = missingFields(
				CreateInputServiceSchema,
				request.body,
			);

			if (!status) return parsedBody;

			const service = await this.createService.execute(parsedBody);

			return {
				statusCode: 200,
				body: service,
			};
		} catch (error) {
			return errorHandler(error);
		}
	}
}

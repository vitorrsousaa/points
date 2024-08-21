import type { IController } from "@application/interfaces/controller";
import type { IRequest, IResponse } from "@application/interfaces/http";
import { errorHandler } from "@application/utils/error-handler";
import { missingFields } from "@application/utils/missing-fields";
import {
	type IUpdateService,
	UpdateInputServiceSchema,
} from "../../services/update";

export class UpdateController implements IController {
	constructor(private readonly updateService: IUpdateService) {}
	async handle(request: IRequest): Promise<IResponse> {
		try {
			const [status, parsedBody] = missingFields(UpdateInputServiceSchema, {
				...request.body,
				userId: request.userId,
			});

			if (!status) return parsedBody;

			await this.updateService.execute(parsedBody);

			return {
				statusCode: 201,
				body: null,
			};
		} catch (error) {
			return errorHandler(error);
		}
	}
}

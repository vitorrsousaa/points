import type { IController } from "@application/interfaces/controller";
import type { IRequest, IResponse } from "@application/interfaces/http";
import { errorHandler } from "@application/utils/error-handler";
import { missingFields } from "@application/utils/missing-fields";
import {
	GetAllInputServiceSchema,
	IGetAllService,
} from "../../services/getAll";

export class GetAllController implements IController {
	constructor(private readonly getAllService: IGetAllService) {}
	async handle(request: IRequest): Promise<IResponse> {
		try {
			const [status, parsedBody] = missingFields(GetAllInputServiceSchema, {
				userId: request.userId,
			});

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

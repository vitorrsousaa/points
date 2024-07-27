import type { IController } from "@application/interfaces/controller";
import type { IRequest, IResponse } from "@application/interfaces/http";
import { errorHandler } from "@application/utils/error-handler";
import { missingFields } from "@application/utils/missing-fields";
import {
	AccountConfirmationInputServiceSchema,
	type IAccountConfirmationService,
} from "../../services/accountConfirmation";

export class AccountConfirmationController implements IController {
	constructor(
		private readonly accountConfirmationService: IAccountConfirmationService,
	) {}
	async handle(request: IRequest): Promise<IResponse> {
		try {
			const [status, parsedBody] = missingFields(
				AccountConfirmationInputServiceSchema,
				request.body,
			);

			if (!status) return parsedBody;

			await this.accountConfirmationService.execute(parsedBody);

			return {
				statusCode: 204,
				body: null,
			};
		} catch (error) {
			return errorHandler(error);
		}
	}
}

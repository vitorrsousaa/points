import { IController } from "@application/interfaces/controller";
import { IRequest, IResponse } from "@application/interfaces/http";
import { errorHandler } from "@application/utils/error-handler";
import { missingFields } from "@application/utils/missing-fields";
import {
	AccountStatusInputServiceSchema,
	IAccountStatusService,
} from "../../services/accountStatus";

export class AccountStatusController implements IController {
	constructor(private readonly accountStatusService: IAccountStatusService) {}

	async handle(request: IRequest): Promise<IResponse> {
		try {
			const [status, parsedBody] = missingFields(
				AccountStatusInputServiceSchema,
				request.params,
			);

			if (!status) return parsedBody;

			const { accountConfirmation } =
				await this.accountStatusService.execute(parsedBody);

			return {
				statusCode: 201,
				body: {
					accountConfirmation,
				},
			};
		} catch (error) {
			return errorHandler(error);
		}
	}
}

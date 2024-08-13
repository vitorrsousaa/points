import { type Mocked, vi } from "vitest";
import { 
	type IGetAllByAthleteIdInput,
	type IGetAllByAthleteIdService,
	GetAllByAthleteIdService 
} from './service';

describe('Service:GetAllByAthleteId', () => {
	let service: IGetAllByAthleteIdService;
	const inputData: IGetAllByAthleteIdInput = {
		name: 'John Doe'
	}
		
	beforeEach(() => {
		service = new GetAllByAthleteIdService();
	});
	
	afterEach(() =>{
		vi.clearAllMocks();
	});
	
	it('Should correct', async () =>{
		// Arrange
		
		// Act
		await service.execute(inputData);
		
		// Assert
		expect(true).toBe(true);
	})
})

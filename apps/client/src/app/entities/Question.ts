interface Question {
	question: string;
	answer: string;
}

export interface ResearchQuestion {
	userId: string;
	questions: Array<Question>;
}

export interface Question {
	id: number;
	title: string;
	description: string;
	updatedAt: string;
	createdAt: string;
}

export interface Answer {
	id: number;
	content: string;
	updatedAt: string;
	createdAt: string;
	questionId: number;
}

export interface Err {
	message: string;
}

export const baseUrl = "http://localhost:8050/api";

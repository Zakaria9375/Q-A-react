export interface Answer {
	id: number;
	content: string;
	updatedAt: string;
	createdAt: string;
	questionId: number;
	userId: number | null;
}

export interface Question {
	id: number;
	title: string;
	description?: string;
	updatedAt: string;
	createdAt: string;
	userId: number;
	_embedded: {
		answers?: Answer[];
	};
}

export interface DBUser {
	id: number;
	name: string;
	photo: string | null;
	email: string;
}
export interface Err {
	message: string;
}

export const baseUrl = import.meta.env.VITE_AUTH0_AUDIENCE;

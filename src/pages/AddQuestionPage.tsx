import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { baseUrl } from "../types/types";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../stores/reducers";

type Inputs = {
	title: string;
	description: string;
};

function AddQuestion() {
	const navigate = useNavigate();
	const { isAuthenticated, user } = useSelector(
		(state: RootState) => state.auth
	);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>();
	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		const newQuestion = {
			title: data.title,
			description: data.description,
			userId: `${baseUrl}/users/${user?.id}`,
		};
		if (isAuthenticated) {
			const response = await axios.post(`${baseUrl}/questions`, {
				...newQuestion,
			});
			navigate(`/question/${response.data.id}`);
		}
	};
	return (
		<>
			<h1 className="text-center heading-1">Ask your Question</h1>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="space-y-4 mt-6"
				aria-label="Add New Question"
			>
				<div>
					<label htmlFor="title">Title:</label>
					<input
						placeholder="What is the capital of Latvia?"
						{...register("title", { required: true })}
						id="title"
						aria-describedby={errors.title ? "title-error" : ""}
						className={errors.title ? "invalid-input" : ""}
					/>
					{errors.title && (
						<p className="error" id="title-error">
							This field is required
						</p>
					)}
				</div>
				<div>
					<label htmlFor="description">Description:</label>
					<textarea
						placeholder="Write a detailed description.."
						{...register("description")}
						id="description"
					></textarea>
				</div>
				<div className="end-flex">
					<button type="submit" className="btn">
						Add Question
					</button>
				</div>
			</form>
		</>
	);
}

export default AddQuestion;

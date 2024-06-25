import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
	title: string;
	description: string;
};

function AddQuestion() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>();
	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		const url = "http://localhost:8050/api/questions";
		const sendData = await axios.post(url, { ...data });
		console.log("New Q:", sendData);
	};
	return (
		<>
			<h1 className="text-center heading-1">Ask your Question</h1>
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-6">
				<div>
					<label htmlFor="title">Title:</label>
					<input
						placeholder="What is the capital of Latvia?"
						{...register("title", { required: true })}
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

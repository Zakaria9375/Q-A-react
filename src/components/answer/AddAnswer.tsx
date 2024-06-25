import { SubmitHandler, useForm } from "react-hook-form";

type fields = { answer: string };

function AddAnswer() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<fields>();
	const onSubmit: SubmitHandler<fields> = (data) => console.log(data);
	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<textarea
					placeholder="Add a new answer"
					aria-label="Answer"
					{...register("answer", { required: true })}
				></textarea>
				{errors.answer && (
					<p className="error" id="answer-error">
						This field is required
					</p>
				)}
				<div className="end-flex">
					<button type="submit" className="btn">
						Add Answer
					</button>
				</div>
			</form>
		</>
	);
}

export default AddAnswer;

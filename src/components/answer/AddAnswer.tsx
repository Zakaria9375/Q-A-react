import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { baseUrl } from "../../types/types";

type fields = { answer: string };
interface AddAnswerProps {
	questionId: number;
	emitData: VoidFunction;
}
function AddAnswer(props: AddAnswerProps) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<fields>();
	const onSubmit: SubmitHandler<fields> = async (data) => {
		const theSendingData = {
			content: data.answer,
			question: `${baseUrl}/questions/${props.questionId}`,
		};
		await axios.post(`${baseUrl}/answers`, theSendingData);
		props.emitData();
	};
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

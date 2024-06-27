import { useId } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type Fields = { answer: string };
interface EditorAnswerProps {
	content?: string;
	btnName?: string;
	emitAnswer: (data: Fields) => void;
}
const AnswerEditor: React.FC<EditorAnswerProps> = ({
	content = "",
	btnName = "Submit",
	emitAnswer,
}) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<Fields>();

	const onSubmit: SubmitHandler<Fields> = (data) => {
		emitAnswer(data);
		reset();
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} aria-label="Add an answer">
			<textarea
				placeholder="Add a new answer"
				aria-label="Add a new answer"
				defaultValue={content}
				aria-describedby={errors.answer ? "answer-error" : ""}
				className={errors.answer ? "invalid-input" : ""}
				{...register("answer", { required: true })}
			></textarea>
			{errors.answer && (
				<p className="error" aria-live="polite" id="answer-error">
					This field is required
				</p>
			)}
			<div className="end-flex">
				<button type="submit" className="btn">
					{btnName}
				</button>
			</div>
		</form>
	);
};
export default AnswerEditor;

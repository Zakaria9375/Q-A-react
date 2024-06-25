interface ErrorProps {
	message: string;
	onConfirm?: VoidFunction;
}

function AppError(props: ErrorProps) {
	return (
		<div className="bg-red-400 p-6 m-4 rounded-md space-y-4">
			<h2>Error occurred!!</h2>
			<p>Message: {props.message}</p>

			{props.onConfirm && (
				<div className="end-flex">
					<button onClick={props.onConfirm} className="btn">
						Okay
					</button>
				</div>
			)}
		</div>
	);
}
export default AppError;

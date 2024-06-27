import AppSpinner from "./AppSpinner";
import NameSpinner from "./NameSpinner";

interface DataLoaderProps {
	isLoading: boolean;
	error: string | null;
	children: React.ReactNode;
	onConfirm?: VoidFunction;
	nameSpinner?: boolean;
}

const DataLoader: React.FC<DataLoaderProps> = ({
	isLoading,
	error,
	children,
	onConfirm,
	nameSpinner,
}) => {
	if (isLoading) {
		const spinner = nameSpinner ? <NameSpinner /> : <AppSpinner />;
		return spinner;
	}

	if (error) {
		return (
			<>
				<div
					className="bg-red-400 p-6 m-4 rounded-md space-y-4"
					role="alert"
					aria-live="assertive"
				>
					<h2>Error occurred!!</h2>
					<p>Message: error</p>
					{onConfirm && (
						<div className="end-flex">
							<button onClick={onConfirm} className="btn">
								Okay
							</button>
						</div>
					)}
				</div>
			</>
		);
	}

	return <>{children}</>;
};

export default DataLoader;

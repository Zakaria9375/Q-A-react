import useAppAuth from "../hooks/useAppAuth";

function AppCallback() {
	useAppAuth();
	return (
		<>
			<div className="flex items-center justify-center min-h-dvh w-full">
				<span className="loader-spinner"></span>
			</div>
		</>
	);
}

export default AppCallback;

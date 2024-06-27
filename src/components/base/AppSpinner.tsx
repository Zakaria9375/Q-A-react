function AppSpinner() {
	return (
		<div
			role="status"
			aria-live="polite"
			className="flex items-center justify-center min-h-[300px] w-full"
		>
			<span className="loader-spinner"></span>
		</div>
	);
}

export default AppSpinner;

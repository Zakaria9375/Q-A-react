function NameSpinner() {
	return (
		<div
			className="flex gap-4 w-fit min-w-28 py-3 px-5 mx-6 bg-white rounded-t-md shadow-ninja override-bg"
			role="status"
			aria-live="polite"
		>
			<div className="name-spin"></div>
		</div>
	);
}

export default NameSpinner;

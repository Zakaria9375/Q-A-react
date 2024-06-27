interface ModalProps {
	show: boolean;
	onClose: () => void;
	children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ show, onClose, children }) => {
	if (!show) {
		return null;
	}

	return (
		<div
			className="absolute flex justify-center items-center right-0 left-0 top-0 bottom-0 z-10"
			role="dialog"
			aria-modal="true"
			aria-live="polite"
		>
			<div
				className="bg-black/50 fixed right-0 left-0 top-0 bottom-0 z-10"
				onClick={onClose}
				aria-hidden="true"
			></div>
			<div className="w-full max-w-[500px] relative z-20 bg-white rounded-lg p-4">
				<div className="end-flex mb-2">
					<button
						className="sm-btn p-1 size-8 m-0"
						onClick={onClose}
						aria-label="Close the Modal"
					>
						<i className="fa-solid fa-xmark"></i>
					</button>
				</div>
				{children}
			</div>
		</div>
	);
};

export default Modal;

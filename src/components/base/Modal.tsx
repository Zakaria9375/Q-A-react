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
		<div className="fixed right-0 left-0 top-0 bottom-0 z-10 flex items-center justify-center">
			<div
				className="absolute right-0 left-0 top-0 bottom-0 z-10 bg-black/50"
				onClick={onClose}
			></div>
			<dialog
				className="block w-full max-w-[500px] relative z-20 bg-white rounded-lg p-4"
				aria-modal="true"
				aria-live="polite"
			>
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
			</dialog>
		</div>
	);
};

export default Modal;

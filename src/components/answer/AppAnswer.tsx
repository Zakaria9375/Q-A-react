import { Answer } from "../../types/types";
import BaseDate from "../base/BaseDate";
import AppModal from "../base/Modal";
import useModal from "../../hooks/useModal";
import EditAnswer from "./EditAnswer";
import { useSelector } from "react-redux";
import { RootState } from "../../stores/reducers";
import UserDetail from "../user/UserDetail";
import DeleteAnswer from "./DeleteAnswer";

interface AnswerProps {
	answer: Answer;
	emitRefetch: () => void;
}

function AppAnswer({ answer, emitRefetch }: AnswerProps) {
	const deleteModal = useModal();
	const editModal = useModal();
	const { isAuthenticated, user } = useSelector(
		(state: RootState) => state.auth
	);
	function deleteAnswer() {
		deleteModal.closeModal();
		emitRefetch();
	}
	function updateAnswer() {
		editModal.closeModal();
		emitRefetch();
	}
	function isUserAnswer() {
		return isAuthenticated && user?.id === answer.userId;
	}
	return (
		<>
			<li>
				<UserDetail userId={answer.userId} />
				<div className="bg-white p-4 shadow-ninja rounded-lg">
					<div className="flex justify-between">
						<BaseDate theDate={answer.createdAt} />
						{isUserAnswer() && (
							<div className="flex gap-2">
								<button
									className="sm-btn"
									aria-label="Edit Answer"
									onClick={editModal.openModal}
								>
									<i className="fa-solid fa-pen size-4"></i>
								</button>
								<button
									className="sm-btn"
									aria-label="Delete Answer"
									onClick={deleteModal.openModal}
								>
									<i className="fa-solid fa-trash-can size-4"></i>
								</button>
							</div>
						)}
					</div>
					<p>{answer.content}</p>
				</div>
			</li>

			<AppModal show={deleteModal.isOpen} onClose={deleteModal.closeModal}>
				<DeleteAnswer id={answer.id} emitData={deleteAnswer} />
			</AppModal>
			<AppModal show={editModal.isOpen} onClose={editModal.closeModal}>
				<EditAnswer answer={answer} emitData={updateAnswer} />
			</AppModal>
		</>
	);
}

export default AppAnswer;

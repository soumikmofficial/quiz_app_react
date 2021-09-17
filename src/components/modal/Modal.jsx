import React from "react";
import { useGlobalContext } from "../../context";
import "./modal.scss";
function Modal() {
  const { isModalOpen, correct, questions, closeModal } = useGlobalContext();
  return (
    <div className={isModalOpen ? " modal-container show" : "modal-container"}>
      <div className="modal">
        <p>
          <span>{((correct / questions.length) * 100).toFixed()}%</span> of your
          answers were correct
        </p>
        <button className="reset" onClick={closeModal}>
          Reset / Play Again
        </button>
      </div>
    </div>
  );
}

export default Modal;

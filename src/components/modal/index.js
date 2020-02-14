import React from "react";
import styles from "./index.module.css";

const Modal = (props) => {
  const { children, isOpen, onCloseModal } = props;
  const { modal_content, active, modal } = styles;

  const onClose = (event,func) => {
    if (event.target.classList.contains(modal)) {
      func()
    }
  }

  return (
    <div
      className={`${modal} ${isOpen ? active : ""}`}
      onClick={(event) => onClose(event,onCloseModal)}
    >
      <div className={modal_content}>
        {children}
      </div>
    </div>
  );
};

export default Modal;

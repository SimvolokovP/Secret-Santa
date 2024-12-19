import { FC, ReactElement } from "react";
import "./Modal.scss";

interface ModalProps {
  isOpen: boolean;
  setOpen: (bool: boolean) => void;
  children: ReactElement;
}

const Modal: FC<ModalProps> = ({ isOpen, setOpen, children }) => {
  return (
    <div
      onClick={() => setOpen(false)}
      className={isOpen ? "modal active" : "modal"}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={isOpen ? "modal__content active" : "modal__content"}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;

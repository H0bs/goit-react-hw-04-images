import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { createPortal } from "react-dom";
import { Overlay, ModalWindow } from "./Modal.styled";
const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ children, onClose }) => {
  useEffect(() => {
    window.addEventListener('keydown', onPressKey);
    return () => window.removeEventListener('keydown', onPressKey);
  });
  
  const onPressKey = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  }

  const onBackdropClick = ({currentTarget, target}) => {
    if (currentTarget === target) {
      onClose();
    }
  }
  
  return createPortal(
    <Overlay onClick={onBackdropClick}>
        <ModalWindow>{children}</ModalWindow>
      </Overlay>,
      modalRoot,
  )
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
}


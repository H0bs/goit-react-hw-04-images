import PropTypes from 'prop-types';
import React, { Component } from "react";
import { createPortal } from "react-dom";
import { Overlay, ModalWindow } from "./Modal.styled";
const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.onPressKey);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onPressKey);
  }

  onPressKey = e => {
    if (e.code === 'Escape') {
      this.props.onClose(); 
    }
  }

  onBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  }

  render() {
    return createPortal(
      <Overlay onClick={this.onBackdropClick}>
        <ModalWindow>{this.props.children}</ModalWindow>
      </Overlay>,
      modalRoot,
    );
  }
}

Modal.protoTypes = {
  onClose: PropTypes.func.isRequired,
}

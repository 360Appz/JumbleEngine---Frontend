import React from 'react';
import { Toast } from 'react-bootstrap';

export const ToastMessage = ({ show, message, onClose, variant }) => (
  <Toast onClose={onClose} show={show} delay={3000} autohide bg={variant}>
    <Toast.Body>{message}</Toast.Body>
  </Toast>
);
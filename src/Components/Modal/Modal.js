import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import styles from './Modal.module.scss';

const modalRoot = document.querySelector('#modal-root');

function Modal({ onClose, children }) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    console.log('addEventListener');
  });

  useEffect(() => {
    window.removeEventListener('keydown', handleKeyDown);
    console.log('removeEventListener');
  });

  const handleKeyDown = e => {
    console.log('handleKeyDown', e);
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const handleBackdropClick = event => {
    // console.log("handleBackdropClick", event)
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  return createPortal(
    <div className={styles.Overlay} onClick={handleBackdropClick}>
      <div className={styles.Modal}>{children}</div>
    </div>,
    modalRoot,
  );
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;

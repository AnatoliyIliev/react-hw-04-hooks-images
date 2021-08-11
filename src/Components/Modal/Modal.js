import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import styles from './Modal.module.scss';

const modalRoot = document.querySelector('#modal-root');

function Modal({ onClose, children }) {
  // const handleKeyDown = e => {
  //   if (e.code === 'Escape') {
  //     onClose();
  //   }
  // };

  // useEffect(() => {
  //   window.addEventListener('keydown', handleKeyDown);
  // }, [handleKeyDown]);

  // useEffect(() => {
  //   window.addEventListener('keydown', handleKeyDown);
  // }, [handleKeyDown]);

  // ПОМЕНЯТЬ---------------------!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1
  // componentDidMount() {
  //   window.addEventListener('keydown', handleKeyDown);
  // }
  // ПОМЕНЯТЬ---------------------!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1
  // componentWillUnmount() {
  //   window.removeEventListener('keydown', handleKeyDown);
  // }

  const handleBackdropClick = event => {
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

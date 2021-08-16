import { useEffect } from 'react';
import styles from './Button.module.scss';

function Button({ onFetch }) {
  useEffect(() => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  }, [onFetch]);

  return (
    <div className={styles.Center}>
      <button type="button" className={styles.Button} onClick={onFetch}>
        Load more
      </button>
    </div>
  );
}

export default Button;

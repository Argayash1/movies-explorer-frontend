import './Popup.css';
import { useEffect } from 'react';

function Popup({ children, isOpen, onClose }) {
  useEffect(() => {
    function handleEscapeKey(e) {
      if (e.key === 'Escape') {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      return () => document.removeEventListener('keydown', handleEscapeKey);
    }
  }, [isOpen, onClose]);

  function closeAllPopupsByClickOnOverlay(e) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  return (
    <section className={`popup ${isOpen && 'popup_is_opened'}`} onMouseDown={closeAllPopupsByClickOnOverlay}>
      {children}
    </section>
  );
}

export default Popup;

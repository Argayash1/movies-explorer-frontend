import './BurgerCloseButton.css';

function BurgerCloseButton({ onClose }) {
  return <button className='burger-close-button' onClick={onClose}></button>;
}

export default BurgerCloseButton;

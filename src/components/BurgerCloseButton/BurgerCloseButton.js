import './BurgerCloseButton.css';

function BurgerCloseButton({ onClose }) {
  return <button className='burger-close-button' type='button' onClick={onClose}></button>;
}

export default BurgerCloseButton;

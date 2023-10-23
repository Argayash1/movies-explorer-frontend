import { useNavigate } from 'react-router-dom';
import './AccountButton.css';

function AccountButton({ onCloseBurgerMenu }) {
  const navigate = useNavigate();

  function handleNavigeteToProfile() {
    navigate('/profile');
    onCloseBurgerMenu && onCloseBurgerMenu();
  }

  return (
    <button className='account-button' type='button' onClick={handleNavigeteToProfile}>
      Аккаунт
    </button>
  );
}

export default AccountButton;

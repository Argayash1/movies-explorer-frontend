import './AccountButton.css';

function AccountButton({ onNavigateToProfile, onCloseBurgerMenu }) {
  function handleNavigeteToProfile() {
    onNavigateToProfile();
    onCloseBurgerMenu && onCloseBurgerMenu();
  }

  return (
    <button className='account-button' type='button' onClick={handleNavigeteToProfile}>
      Аккаунт
    </button>
  );
}

export default AccountButton;

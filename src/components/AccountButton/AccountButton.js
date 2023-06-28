import './AccountButton.css';

function AccountButton({ onNavigateToProfile }) {
  return (
    <button className='account-button' type='button' onClick={onNavigateToProfile}>
      Аккаунт
    </button>
  );
}

export default AccountButton;

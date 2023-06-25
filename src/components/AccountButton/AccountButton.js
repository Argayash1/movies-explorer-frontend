import './AccountButton.css';
import { Link } from 'react-router-dom';

function AccountButton({ onNavigateToProfile }) {
  return (
    <button className='account-button' type='button' onClick={onNavigateToProfile}>
      Аккаунт
    </button>
  );
}

export default AccountButton;

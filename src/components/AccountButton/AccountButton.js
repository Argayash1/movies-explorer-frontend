import './AccountButton.css';
import { Link } from 'react-router-dom';

function AccountButton() {
  return (
    <Link to='/profile' className='account-button'>
      Аккаунт
    </Link>
  );
}

export default AccountButton;

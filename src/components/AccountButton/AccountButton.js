import './AccountButton.css';
import { Link } from 'react-router-dom';

function AccountButton() {
  return (
    <Link to='/profile' className='logged-in-menu__link'>
      <button className='logged-in-menu__button'>Аккаунт</button>
    </Link>
  );
}

export default AccountButton;

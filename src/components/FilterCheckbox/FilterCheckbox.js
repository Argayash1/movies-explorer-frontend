import './FilterCheckbox.css';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function FilterCheckbox({ checked, onFilter, isLoading }) {
  const [isChecked, setIsChecked] = useState(false);

  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === '/movies' && checked !== null) {
      setIsChecked(checked);
    }
  }, [pathname, checked]);

  const handleCheckboxChange = () => {
    const newValue = !isChecked;
    setIsChecked(newValue);
    onFilter(newValue);
  };

  return (
    <div className='filter-checkbox'>
      <label className='filter-checkbox__input-label'>
        <input
          type='checkbox'
          className='filter-checkbox__invisible-checkbox'
          onChange={handleCheckboxChange}
          checked={isChecked}
          disabled={isLoading}
          id='checkbox'
          name='checkbox'
        />
        <span className='filter-checkbox__visible-checkbox filter-checkbox__visible-checkbox_type_checked'></span>
      </label>
      <p className='filter-checkbox__text'>Короткометражки</p>
    </div>
  );
}

export default FilterCheckbox;

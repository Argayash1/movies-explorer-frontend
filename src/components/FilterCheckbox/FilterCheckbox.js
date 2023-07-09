import { useEffect, useState } from 'react';
import './FilterCheckbox.css';
import { useLocation } from 'react-router-dom';

function FilterCheckbox({ checked, onFilter }) {
  const [isChecked, setIsChecked] = useState(false);

  const { pathname } = useLocation();

  useEffect(() => {
    const storedValue = localStorage.getItem('checkboxState');
    if (pathname === '/movies' && storedValue !== null) {
      setIsChecked(JSON.parse(storedValue));
    }
  }, [pathname]);

  const handleCheckboxChange = () => {
    const newValue = !isChecked;
    setIsChecked(newValue);
    localStorage.setItem('checkboxState', JSON.stringify(newValue));
    onFilter(isChecked);
  };

  return (
    <div className='filter-checkbox'>
      <label className='filter-checkbox__input-label'>
        <input
          type='checkbox'
          className='filter-checkbox__invisible-checkbox'
          onChange={handleCheckboxChange}
          checked={isChecked}
        />
        <span className='filter-checkbox__visible-checkbox filter-checkbox__visible-checkbox_type_checked'></span>
      </label>
      <p className='filter-checkbox__text'>Короткометражки</p>
    </div>
  );
}

export default FilterCheckbox;

import { useState } from 'react';
import './FilterCheckbox.css';

function FilterCheckbox({ checked = false, onFilter }) {
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = (e) => {
    setIsChecked(e.target.checked);
    onFilter(isChecked);
  };

  return (
    <div className='filter-checkbox'>
      <label className='filter-checkbox__input-label'>
        <input
          type='checkbox'
          className='filter-checkbox__invisible-checkbox'
          onChange={handleChange}
          checked={isChecked || ''}
        />
        <span className='filter-checkbox__visible-checkbox filter-checkbox__visible-checkbox_type_checked'></span>
      </label>
      <p className='filter-checkbox__text'>Короткометражки</p>
    </div>
  );
}

export default FilterCheckbox;

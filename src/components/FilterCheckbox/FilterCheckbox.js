import { useState } from 'react';
import './FilterCheckbox.css';

function FilterCheckbox({ onChekIsCheckboxChecked, checked = false }) {
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = (e) => {
    setIsChecked(e.target.checked);
    onChekIsCheckboxChecked(isChecked);
    console.log(isChecked);
  };

  return (
    <div className='filter-checkbox'>
      <label className='filter-checkbox__input-label'>
        <input
          type='checkbox'
          className='filter-checkbox__invisible-checkbox'
          onChange={handleChange}
          checked={checked || ''}
        />
        <span className='filter-checkbox__visible-checkbox filter-checkbox__visible-checkbox_type_checked'></span>
      </label>
      <p className='filter-checkbox__text'>Короткометражки</p>
    </div>
  );
}

export default FilterCheckbox;

import './FilterCheckbox.css';

function FilterCheckbox() {
  return (
    <div className='filter-checkbox'>
      <label className='filter-checkbox__input-label'>
        <input type='checkbox' className='filter-checkbox__invisible-checkbox' />
        <span className='filter-checkbox__visible-checkbox filter-checkbox__visible-checkbox_type_checked'></span>
      </label>
      <p className='filter-checkbox__text'>Короткометражки</p>
    </div>
  );
}

export default FilterCheckbox;

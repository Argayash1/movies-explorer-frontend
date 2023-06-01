import NavTab from "../NavTab/NavTab"
import header_logo from "../../images/header_logo.svg";

import './Promo.css'

function Promo() {
    return (
      <div className="promo">
        <header className='promo__header'>
          <img className="promo__logo" src={header_logo} alt="Логотип" />
          <NavTab />
        </header>
        <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
        <img className='promo__decoration' alt=""/>
      </div>
    );
  }
  
  export default Promo;
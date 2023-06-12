import Header from '../Header/Header';
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Footer from '../Footer/Footer';
import './Main.css';

function Main({ isBurgerMenuOpen, onBurgerMenuOpen }) {
  return (
    <main className='main'>
      {/* <Header isBurgerMenuOpen={isBurgerMenuOpen} onBurgerMenuOpen={onBurgerMenuOpen} /> */}
      {/* <Promo /> */}
      {/* <AboutProject /> */}
      {/* <Techs /> */}
      <AboutMe />
      {/* <Footer /> */}
    </main>
  );
}

export default Main;

import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import './Main.css';

function Main() {
  return (
    <main className='main'>
      <Promo />
      <AboutProject />
      <Techs />
      <AboutMe />
    </main>
  );
}

export default Main;

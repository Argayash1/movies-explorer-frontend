import './Promo.css';
import SectionContent from '../SectionContent/SectionContent';

function Promo() {
  return (
    <section className='promo'>
      <SectionContent>
        <h1 className='promo__title'>Учебный проект студента факультета Веб-разработки.</h1>
        <div className='promo__decoration'></div>
      </SectionContent>
    </section>
  );
}

export default Promo;

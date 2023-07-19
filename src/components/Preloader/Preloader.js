import React from 'react';
import './Preloader.css';
import { useLocation } from 'react-router-dom';

const Preloader = () => {
  const { pathname } = useLocation();

  return (
    <section className={`preloader ${pathname === '/' ? 'preloader_place_main' : ''}`}>
      <div className='preloader__container'>
        <span className={`preloader__round ${pathname === '/' ? 'preloader__round_place_main' : ''}`}></span>
      </div>
    </section>
  );
};

export default Preloader;

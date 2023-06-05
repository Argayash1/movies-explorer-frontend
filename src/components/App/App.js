import { Routes, Route, Outlet } from 'react-router-dom'; // импортируем Routes
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import Profile from '../Profile/Profile';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import PageNotFound from '../PageNotFound/PageNotFound';
import './App.css';

import moviesCards from '../../utils/moviesCards';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Main />}></Route>
        <Route path='/movies' element={<Movies moviesCards={moviesCards.slice(0, 12)} />}></Route>
        <Route path='/saved-movies' element={<SavedMovies moviesCards={moviesCards.slice(0, 3)} />}></Route>
        <Route path='/profile' element={<Profile />}></Route>
        <Route path='/signin' element={<Login />}></Route>
        <Route path='/signup' element={<Register />}></Route>
        <Route path='*' element={<PageNotFound />}></Route>
      </Routes>
      <Outlet />
    </div>
  );
}

export default App;

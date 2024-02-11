import { SHORT_MOVIE_DURATION } from './configs/cardsConfig';


export const handleFilterShortMovies = (movies) => {
    return movies.filter((movie) => movie.duration <= SHORT_MOVIE_DURATION)
}
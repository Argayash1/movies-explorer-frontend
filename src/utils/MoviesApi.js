import { BEAT_FILM_MOVIES_URL } from './configs/urlConfig';

class MoviesApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }

    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _request(endpoint, options) {
    return fetch(`${this._baseUrl}${endpoint}`, options).then(this._checkResponse);
  }

  getMovies() {
    return this._request('/', {
      headers: this._headers,
    });
  }
}

// Создаём экземпляр класса Api
const moviesApi = new MoviesApi({
  baseUrl: BEAT_FILM_MOVIES_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default moviesApi;

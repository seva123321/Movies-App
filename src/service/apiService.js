import NoNetError from './ErrorHandler'

class ApiService {
  #apiKey = import.meta.env.VITE_API_KEY

  #baseURL = 'https://api.themoviedb.org/'

  // Общие метод для выполнения запросов
  async #fetchData(url) {
    if (!navigator.onLine) {
      throw new NoNetError('Нет подключения к Интернету')
    }

    const res = await fetch(url)

    if (!res.ok) {
      const errorData = await res.json()
      throw new Error(JSON.stringify(errorData))
    }

    this.resource = await res.json()
    return this.resource
  }

  async #postData(url, body) {
    if (!navigator.onLine) {
      throw new NoNetError('Нет подключения к Интернету')
    }

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(body),
    })

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received status ${res.status}`)
    }

    this.resource = await res.json()
    return this.resource
  }

  #createUrl(endpoint, params = {}) {
    const url = new URL(endpoint, this.#baseURL)
    url.searchParams.set('api_key', this.#apiKey)

    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, value)
    })

    return url
  }

  // Методы для работы с API

  async getGuestSession() {
    const url = this.#createUrl('3/authentication/guest_session/new')
    return this.#fetchData(url)
  }

  async postAddRateByMovieId(movieId, guestSessionId, rateValue) {
    const url = this.#createUrl(`3/movie/${movieId}/rating`, {
      guest_session_id: guestSessionId,
    })

    const body = { value: rateValue }
    return this.#postData(url, body)
  }

  async getRateForGuestSession(guestSessionId, page) {
    const url = this.#createUrl(
      `3/guest_session/${guestSessionId}/rated/movies`,
      {
        page,
      }
    )

    return this.#fetchData(url)
  }

  async getGenreMovie() {
    const url = this.#createUrl('3/genre/movie/list')
    return this.#fetchData(url)
  }

  async getMovies(page) {
    const url = this.#createUrl('3/trending/movie/day', { page })
    return this.#fetchData(url)
  }

  async getSearchMovies(searchWords, page) {
    const url = this.#createUrl('3/search/movie', {
      query: searchWords,
      page,
    })

    return this.#fetchData(url)
  }
}

export default ApiService

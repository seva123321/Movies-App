import NoNetError from './ErrorHandler'

export default class ApiService {
  #apiKey = 'acfb8ae41f140bd262811d79c223b49b'

  #baseURL = 'https://api.themoviedb.org/'

  // #baseURLImage = 'https://image.tmdb.org/t/p/w500/'

  async getResource(url) {
    if (navigator.onLine) {
      const res = await fetch(url)

      if (!res.ok) {
        throw new Error(`Could not fetch ${url}, received status ${res.status}`)
      }

      this.resource = await res.json()

      return this.resource
    }
    throw new NoNetError('Нет подключения к Интеренету')
  }

  async getMovies(page) {
    const url = this.createUrlMovies(page)
    const result = await this.getResource(url)

    return result
  }

  async getSearchMovies(searchWords, page) {
    const url = this.createUrlSearchMovies(searchWords, page)
    const result = await this.getResource(url)

    return result
  }

  createUrlSearchMovies(searchWords, page) {
    const url = new URL('3/search/movie', this.#baseURL)
    url.searchParams.set('api_key', this.#apiKey)
    url.searchParams.set('query', searchWords)
    url.searchParams.set('page', page)

    return url
  }

  createUrlMovies(page) {
    const url = new URL('3/trending/movie/day', this.#baseURL)
    url.searchParams.set('api_key', this.#apiKey)
    url.searchParams.set('page', page)

    return url
  }

  // async getOneImage(imgUrl) {
  //   const url = new URL(imgUrl, this.#baseURLImage)

  //   const result = await fetch(`${url}`)

  //   return result.json()
  // }
}

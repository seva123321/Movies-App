export default class ApiService {
  #apiKey = 'acfb8ae41f140bd262811d79c223b49b'

  #baseURL = 'https://api.themoviedb.org/'

  #baseURLImage = 'https://image.tmdb.org/t/p/w500/'

  async getMovies(page) {
    const url = new URL('3/trending/movie/day', this.#baseURL)
    url.searchParams.set('api_key', this.#apiKey)
    url.searchParams.set('page', page)

    const result = await fetch(`${url}`)

    return result.json()
  }

  async getSearchMovies(searchWords, page) {
    const url = new URL('3/search/movie', this.#baseURL)
    url.searchParams.set('api_key', this.#apiKey)
    url.searchParams.set('query', searchWords)
    url.searchParams.set('page', page)
    // url.searchParams.set('include_adult', false)
    // url.searchParams.set('language', 'en-US')
    const result = await fetch(`${url}`)

    return result.json()
  }

  async getOneImage(imgUrl) {
    const url = new URL(imgUrl, this.#baseURLImage)

    const result = await fetch(`${url}`)

    return result.json()
  }
}

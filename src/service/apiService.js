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

  async postResource(url, body) {
    if (navigator.onLine) {
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
    throw new NoNetError('Нет подключения к Интеренету')
  }

  async getGuestSession() {
    //+
    // https://api.themoviedb.org/3/authentication/guest_session/new?api_key=acfb8ae41f140bd262811d79c223b49b
    const url = new URL('3/authentication/guest_session/new', this.#baseURL)
    url.searchParams.set('api_key', this.#apiKey)
    const result = await this.getResource(url)

    // {
    //     "success": true,
    //     "guest_session_id": "35addbcaf83e61f418bd16ec7eb59080",
    //     "expires_at": "2025-02-28 16:50:51 UTC"
    // }

    return result
  }

  async postAddRateByMovieId(movieId, guestSessionId, rateValue) {
    // https://api.themoviedb.org/3/movie/1405338/rating?guest_session_id=b19e42c1d2789c66687bffa9d23da5db&api_key=acfb8ae41f140bd262811d79c223b49b
    const url = new URL(`3/movie/${movieId}/rating`, this.#baseURL)

    // const guestSessionId = '35addbcaf83e61f418bd16ec7eb59080'
    url.searchParams.set('guest_session_id', guestSessionId)
    url.searchParams.set('api_key', this.#apiKey)
    // {"value":3}

    const body = { value: rateValue }

    const result = await this.postResource(url, body)

    return result
  }

  async getRateForGuestSession(guestSessionId, page) {
    //-
    // https://api.themoviedb.org/3/guest_session/e524c931a0767b596b9f42959326eba9/rated/movies?api_key=acfb8ae41f140bd262811d79c223b49b
    // const guestSessionId = 'e524c931a0767b596b9f42959326eba9'
    const url = new URL(
      `3/guest_session/${guestSessionId}/rated/movies`,
      this.#baseURL
    )
    url.searchParams.set('api_key', this.#apiKey)
    url.searchParams.set('page', page)

    const result = await this.getResource(url)

    return result
    //   {
    //     "page": 1,
    //     "results": [
    //         {
    //             "adult": false,
    //             "backdrop_path": null,
    //             "genre_ids": [
    //                 18
    //             ],
    //             "id": 1405468,
    //             "original_language": "sk",
    //             "original_title": "Manželstvo Kataríny T.",
    //             "overview": "",
    //             "popularity": 0.006,
    //             "poster_path": null,
    //             "release_date": "1985-01-01",
    //             "title": "Manželstvo Kataríny T.",
    //             "video": false,
    //             "vote_average": 3.0,
    //             "vote_count": 2,
    //             "rating": 3.0
    //         },
    //         {
    //             "adult": false,
    //             "backdrop_path": null,
    //             "genre_ids": [
    //                 99
    //             ],
    //             "id": 1405368,
    //             "original_language": "en",
    //             "original_title": "Take That's Greatest Days: 30 Years in the Making",
    //             "overview": "Peek behind the scenes of Take
    //              That's new film Greatest Days about the band's army
    //              of fans. Hear from filmmakers, celebs and the band
    //              about why this vital story had to be told.",
    //             "popularity": 0.4,
    //             "poster_path": "/kgKHnEMlNmIyndJGmMHHuh4soLY.jpg",
    //             "release_date": "",
    //             "title": "Take That's Greatest Days: 30 Years in the Making",
    //             "video": false,
    //             "vote_average": 3.0,
    //             "vote_count": 1,
    //             "rating": 3.0
    //         }
    //     ],
    //     "total_pages": 1,
    //     "total_results": 2
    // }
  }

  async getGenreMovie() {
    //+
    // https://api.themoviedb.org/3/genre/movie/list?api_key=acfb8ae41f140bd262811d79c223b49b
    const url = new URL('3/genre/movie/list', this.#baseURL)
    url.searchParams.set('api_key', this.#apiKey)

    const result = await this.getResource(url)

    return result
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

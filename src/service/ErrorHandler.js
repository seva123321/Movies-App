export default class NoNetError extends Error {
  constructor(message) {
    super(message)
    this.name = this.constructor.name
  }
}

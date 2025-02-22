const debounce = (fn, debounceTime) => {
  let idTimer

  const debouncedFn = (...rest) => {
    clearTimeout(idTimer)
    idTimer = setTimeout(() => {
      fn.apply(this, rest)
    }, debounceTime)
  }

  debouncedFn.cancel = () => {
    clearTimeout(idTimer)
  }

  return debouncedFn
}
export default debounce

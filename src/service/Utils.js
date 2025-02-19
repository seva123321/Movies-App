const debounce = (fn, debounceTime) => {
  let isCalled = false
  let idTimer

  const debouncedFn = (...rest) => {
    if (isCalled) {
      clearTimeout(idTimer)
      isCalled = false
    }

    if (!isCalled) {
      idTimer = setTimeout(() => {
        fn.apply(this, rest)
        isCalled = false
      }, debounceTime)

      isCalled = true
    }
  }

  debouncedFn.cancel = () => {
    clearTimeout(idTimer)
    isCalled = false
  }

  return debouncedFn
}
export default debounce

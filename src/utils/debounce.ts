function debounce(fn: (...args:any[]) => void, delay: number) {
  let timer: number
  return function(...args: any[]) {
    if(timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn(...args)
    }, delay)
  }
}

export default debounce
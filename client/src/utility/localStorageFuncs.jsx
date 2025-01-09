export const getLocalStorage = (localItem, setFunction) => {
  if (window.localStorage.getItem(localItem)) {
    const localReturn = window.localStorage.getItem(localItem)
    setFunction(JSON.parse(localReturn))
  }
}

export const clearLocalStorage = (localItem, value, setFunction) => {
  window.localStorage.setItem(localItem, JSON.stringify(value))
  const localReturn = window.localStorage.getItem(localItem)
  setFunction(JSON.parse(localReturn))
}
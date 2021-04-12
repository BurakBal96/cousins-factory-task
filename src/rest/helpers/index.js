import {useRef, useEffect} from 'react'
export {qs} from './QueryString'

export const sleep = async (delay = 2000) =>
  await new Promise(r => setTimeout(r, delay))

export const FormOptions = {
  shouldValidate: true,
  shouldDirty: true,
}

export const get = (object = {}, keys = '', defaultVal) => {
  keys = Array.isArray(keys) ? keys : keys.split('.')
  object = object[keys[0]]
  if (object && keys.length > 1) {
    return get(object, keys.slice(1))
  }
  return object === undefined ? defaultVal : object
}

export const kFormatter = num => {
  return Math.abs(num) > 999
    ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + 'k'
    : Math.sign(num) * Math.abs(num)
}

export const useInterval = (callback, delay) => {
  const savedCallback = useRef()

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current()
    }

    if (delay !== null) {
      let id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}

function reduceObject (obj, transform) {
  return Object.keys(obj)
    .reduce((acc, key) => {
      acc.push(transform(key, obj[key]))
      return acc
    }, [])
}

export function buildURI (uri, params) {
  return `${uri}?${reduceObject(params,
    (key, val) => `${key}=${encodeURIComponent(val)}`).join('&')
    }`
}

export function getQuery () {
  let raw = window.location.search.substr(1)
  if (raw) {
    return raw
      .split('&')
      .map(e => e.split('=', 2))
      .reduce((obj, [key, value]) => {
        obj[key] = (value && decodeURIComponent(value.replace(/\+/g, ' '))) || true
        return obj
      }, {})
  } else {
    return undefined
  }
}

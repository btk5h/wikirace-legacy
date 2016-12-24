import map from 'lodash/map'
import get from 'lodash/get'

const DEFAULT_WIKI = 'https://en.wikipedia.org/w/api.php'

const DEFAULT_QUERY = {
  origin: '*',
  format: 'json',
  formatversion: 1
}

const DEFAULT_HEADERS = {
  'Api-User-Agent': 'Wikirace/0.0.0-SNAPSHOT'
}

function buildURI (uri, params) {
  return `${uri}?${map(params, (val, key) => `${key}=${encodeURIComponent(val)}`).join('&')}`
}

export async function search (title, api = DEFAULT_WIKI) {
  let raw = await fetch(buildURI(api, {
    ...DEFAULT_QUERY,
    action: 'query',
    list: 'search',
    srsearch: title,
    srnamespace: 0,
    srlimit: 1,
    srinfo: '',
    srprop: ''
  }), {
    headers: {
      ...DEFAULT_HEADERS
    }
  })
  let resp = await raw.json()
  return get(resp, 'query.search[0].title')
}

export async function parse (title, api = DEFAULT_WIKI) {
  let raw = await fetch(buildURI(api, {
    ...DEFAULT_QUERY,
    action: 'parse',
    page: title,
    redirects: true,
    disablelimitreport: true,
    disableeditsection: true
  }), {
    headers: {
      ...DEFAULT_HEADERS
    }
  })
  let resp = await raw.json()
  return {
    title: get(resp, 'parse.title'),
    html: get(resp, 'parse.text.*')
  }
}

export async function random (count, api = DEFAULT_WIKI) {
  let raw = await fetch(buildURI(api, {
    ...DEFAULT_QUERY,
    action: 'query',
    list: 'random',
    rnnamespace: 0,
    rnfilterredir: 'nonredirects',
    rnlimit: count
  }), {
    headers: {
      ...DEFAULT_HEADERS
    }
  })
  let resp = await raw.json()
  return get(resp, 'query.random').map(e => e.title)
}


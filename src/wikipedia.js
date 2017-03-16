import {buildURI} from './url'

const DEFAULT_WIKI = 'https://en.wikipedia.org/w/api.php'

const DEFAULT_QUERY = {
  origin: '*',
  format: 'json',
  formatversion: 1
}

const DEFAULT_HEADERS = {
  'Api-User-Agent': 'Wikirace/0.0.0-SNAPSHOT'
}

function getOrNull (obj, ...keys) {
  // safely find a key within an object or return null in the most unreadable way possible
  for (let key of keys) {
    if (!(obj && (obj = obj[key]))) {
      return null
    }
  }
  return obj
}

const STANDARD_NAMESPACES = [
  'User',
  'Wikipedia',
  'File',
  'MediaWiki',
  'Template',
  'Help',
  'Category',
  'Portal',
  'Book',
  'Draft',
  'Educational Program',
  'TimedText',
  'Module'
]

export const NAMESPACES = new Set([
  'Talk',
  ...STANDARD_NAMESPACES,
  ...(STANDARD_NAMESPACES.map(ns => `${ns} talk`)),
  'Special',
  'Media'
])

export async function search (title, api = DEFAULT_WIKI) {
  let raw = await window.fetch(buildURI(api, {
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
  return getOrNull(resp, 'query', 'search', 0, 'title')
}

export async function parse (title, api = DEFAULT_WIKI) {
  let raw = await window.fetch(buildURI(api, {
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
    title: getOrNull(resp, 'parse', 'title'),
    html: getOrNull(resp, 'parse', 'text', '*')
  }
}

export async function random (count, api = DEFAULT_WIKI) {
  let raw = await window.fetch(buildURI(api, {
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
  return getOrNull(resp, 'query', 'random').map(e => e.title)
}

/** @jsx h */

import {h, render} from 'preact'

import App from './App'

import smoothScrollPolyfill from 'smoothscroll-polyfill'

smoothScrollPolyfill.polyfill()

import 'normalize.css/normalize.css'

import './app.css'
import './wikimedia-common.css'

if (module.hot) {
  require('preact/devtools')
}

render(<App />, document.body)

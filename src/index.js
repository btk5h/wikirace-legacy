/** @jsx h */

import {render} from 'preact'
import {Provider} from 'preact-redux'
import Helmet from 'preact-helmet'

import {configureStore} from './redux'
import App from './components/App'

import {getQuery} from './url'

/*
 * App styles
 */

// app-wide css
import './components/app.css'
import './components/wikirace-style.css'

// wikimedia css
import './components/wikimedia-common.css'
import './components/wikimedia-pygments.css'

import {handleBack} from './redux/modules/page'
import {setPages} from './redux/modules/options'

let store = configureStore()

let query = getQuery()

console.log(query)

if (query && query.pages) {
  let [startPage, endPage] = query.pages.split('|')

  store.dispatch(setPages({startPage, endPage}))
}

window.history.replaceState(false, '', '/')
window.history.pushState(true, '', '/')

window.addEventListener('popstate', e => {
  if (!e.state) {
    store.dispatch(handleBack())
  }
})

render((
  <Provider store={store}>
    <div>
      <Helmet
        title='Wikirace'

        link={[
          {rel: 'manifest', href: '/manifest.json'}
        ]}
        meta={[
          {charset: 'UTF-8'},
          {
            name: 'viewport',
            content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'
          },
          {name: 'theme-color', content: '#ffffff'}
        ]} />
      <App />
    </div>
  </Provider>
), document.body)

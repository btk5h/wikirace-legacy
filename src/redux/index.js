import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'

import rootReducer from './rootReducer'

export function configureStore () {
  return createStore(rootReducer,
    (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose)(
      applyMiddleware(thunk)
    ))
}

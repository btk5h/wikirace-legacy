import {combineReducers} from 'redux'

export function get (module) {
  return require(`./modules/${module}`).default
}

export default combineReducers({
  options: get('options'),
  page: get('page'),
  path: get('path'),
  view: get('view')
})

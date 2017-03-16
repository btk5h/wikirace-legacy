import {createAction, createReducer} from 'redux-ar'

import {random} from '../../wikipedia'

export const setPages = createAction('wikirace/options/SET_PAGES')
export function setRandomPages () {
  return async dispatch => {
    let [startPage, endPage] = await random(2)
    dispatch(setPages({startPage, endPage}))
  }
}

export const getStartPage = state => state.options.startPage
export const getEndPage = state => state.options.endPage

export default createReducer({}, {
  [setPages] (state, action) {
    return {
      ...state,
      ...action.payload
    }
  }
})

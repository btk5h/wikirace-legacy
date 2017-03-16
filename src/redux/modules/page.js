import {createAction, createReducer} from 'redux-ar'

import {parse, NAMESPACES} from '../../wikipedia'

import {navigate, undo, getCurrentPage, getUndoPage} from './path'
import {setView, getView} from './view'
import {getStartPage, getEndPage} from './options'

const request = createAction('wikirace/page/REQUEST')
const receive = createAction('wikirace/page/RECEIVE')
const reject = createAction('wikirace/page/REJECT')

export const isLoading = state => state.page.isLoading
export const getHtml = state => state.page.html

export function startGame () {
  return async (dispatch, getState) => {
    dispatch(setView('GAME_PREVIEW'))
    dispatch(loadPage(getEndPage(getState())))
  }
}

export function startMainGame () {
  return async (dispatch, getState) => {
    let state = getState()
    let title = await loadPage(getStartPage(state))(dispatch, getState)
    if (title) {
      dispatch(setView('GAME'))
    }
  }
}

export function loadPage (article) {
  return async (dispatch, getState) => {
    let state = getState()
    let endPage = getEndPage(state)

    if (getView(state) === 'GAME' && article === endPage) {
      dispatch(setView('GAME_END'))
      return
    }

    if (!isLoading(state)) {
      try {
        dispatch(request())

        let {html, title} = await parse(article)

        dispatch(receive(html))

        document.getElementById('wr-scroll-container').scrollTop = 0

        return title
      } catch (e) {
        console.error(e)
        dispatch(reject())
      }
    }
  }
}

export function navigateLink (article) {
  return async (dispatch, getState) => {
    let state = getState()

    if (article !== getCurrentPage(state) &&
      !NAMESPACES.has(article.substr(0, article.indexOf(':'))) &&
      getView(state) !== 'GAME_PREVIEW') {
      let title = await loadPage(article)(dispatch, getState)

      if (title) {
        dispatch(navigate(title))
      }
    }
  }
}

export function handleBack () {
  return async (dispatch, getState) => {
    let state = getState()

    if (getView(state) === 'GAME') {
      window.history.pushState(true, '', '/')

      if (await loadPage(getUndoPage(state))(dispatch, getState)) {
        dispatch(undo())
      }
    } else {
      window.history.back()
    }
  }
}

export default createReducer({}, {
  [request] (state) {
    return {
      ...state,
      isLoading: true
    }
  },
  [receive] (state, action) {
    return {
      ...state,
      isLoading: false,
      html: action.payload
    }
  },
  [reject] (state) {
    return {
      ...state,
      isLoading: false
    }
  }
})

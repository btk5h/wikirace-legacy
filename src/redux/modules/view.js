import {createAction, createReducer} from 'redux-ar'

export const setView = createAction('wikirace/view/SET_VIEW')

export const getView = state => state.view

export default createReducer('MENU', {
  [setView] (state, action) {
    return action.payload
  }
})

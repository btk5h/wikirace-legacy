import {createSelector} from 'reselect'

import {createAction, createReducer} from 'redux-ar'

import {getStartPage} from './options'

const TYPE_UNDO = 'UNDO'

function resolveTail (path, tail = path.length - 1) {
  let tailRecord = path[tail]
  return tailRecord && tailRecord.type === TYPE_UNDO ? tailRecord.to : tail
}

export const navigate = createAction('wikirace/path/NAVIGATE')

export const undo = createAction('wikirace/path/UNDO')

export const getPath = state => state.path

export const getCurrentPage = createSelector(
  [getPath, getStartPage],
  (path, startPage) => path[resolveTail(path)] || startPage
)

export const getUndoPage = createSelector(
  [getPath, getStartPage],
  (path, startPage) => path[resolveTail(path, resolveTail(path) - 1)] || startPage
)

export const getScore = createSelector(
  [getPath],
  path => path.length
)

export default createReducer([], {
  [navigate] (state, action) {
    return [...state, action.payload || '']
  },
  [undo] (state) {
    if (state.length > 1) {
      let tail = resolveTail(state) - 1
      if (tail >= 0) {
        return [...state, {
          type: TYPE_UNDO,
          to: resolveTail(state, tail)
        }]
      }
    }
  }
})

import {connect} from 'preact-redux'

import {getView} from '../redux/modules/view'
import {navigateLink, startMainGame, isLoading, getHtml} from '../redux/modules/page'
import {getCurrentPage, getScore} from '../redux/modules/path'
import {getStartPage, getEndPage} from '../redux/modules/options'

import GameView from './GameView'

export default connect(
  state => ({
    view: getView(state),
    isLoading: isLoading(state),
    startPage: getStartPage(state),
    endPage: getEndPage(state),
    currentPage: getCurrentPage(state),
    score: getScore(state),
    html: getHtml(state)
  }),
  dispatch => ({
    startGame: () => dispatch(startMainGame()),
    onNavigate: e => dispatch(navigateLink(e))
  })
)(GameView)

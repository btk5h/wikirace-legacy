import {connect} from 'preact-redux'

import {startGame} from '../redux/modules/page'

import GameStartView from './GameStartView'

export default connect(
  state => ({
    startPage: state.options.startPage,
    endPage: state.options.endPage,
    isLoading: state.page.isLoading,
    preview: state.options.previewPage
  }),
  dispatch => ({
    startGame: () => dispatch(startGame())
  })
)(GameStartView)

import {connect} from 'preact-redux'

import {setPages, setRandomPages} from '../redux/modules/options'
import {setView} from '../redux/modules/view'

import MenuView from './MenuView'

export default connect(state => ({
  startPage: state.options.startPage,
  endPage: state.options.endPage
}), dispatch => ({
  startPageInput: e => dispatch(setPages({startPage: e.target.value})),
  endPageInput: e => dispatch(setPages({endPage: e.target.value})),
  randomPages: e => dispatch(setRandomPages()),
  startGame: () => dispatch(setView('GAME_START'))
}))(MenuView)

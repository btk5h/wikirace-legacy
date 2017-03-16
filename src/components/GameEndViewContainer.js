import {connect} from 'preact-redux'

import {getPath, getScore} from '../redux/modules/path'
import {getStartPage, getEndPage} from '../redux/modules/options'

import GameEndView from './GameEndView'

export default connect(
  state => ({
    startPage: getStartPage(state),
    endPage: getEndPage(state),
    path: getPath(state),
    score: getScore(state)
  })
)(GameEndView)

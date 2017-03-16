import {connect} from 'preact-redux'

import MenuViewContainer from './MenuViewContainer'
import GameStartViewContainer from './GameStartViewContainer'
import GameViewContainer from './GameViewContainer'
import GameEndViewContainer from './GameEndViewContainer'

function getView (view) {
  switch (view) {
    case 'MENU':
      return <MenuViewContainer />
    case 'GAME_START':
      return <GameStartViewContainer />
    case 'GAME_PREVIEW':
    case 'GAME':
      return <GameViewContainer />
    case 'GAME_END':
      return <GameEndViewContainer />
  }
}

export default connect(state => ({
  view: getView(state.view)
}))(({view}) => view)

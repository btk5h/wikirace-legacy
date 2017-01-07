/** @jsx h */

import {h, Component} from 'preact'

import MenuPage from './menu/MenuPage'
import GamePage from './game/GamePage'

export default class App extends Component {
  constructor () {
    super()
    this.handleGameStart = this.handleGameStart.bind(this)
  }

  handleGameStart ({from, to}) {
    this.setState({from, to})
  }

  render (props, {from, to}) {
    if (!(from && to)) {
      return <MenuPage onGameStart={this.handleGameStart} />
    } else {
      return <GamePage from={from} to={to} />
    }
  }
}

/** @jsx h */

import {h, Component} from 'preact'

import {random} from '../wikipedia'

import ExpandingInput from './ExpandingInput'

const INPUT_STYLE = {
  maxWidth: '100vw',
  fontSize: '10vh',
  color: '#ffffff',
  backgroundColor: 'transparent',
  border: 0,
  boxSizing: 'content-box',
  outline: 'none'
}

export default class MenuPage extends Component {
  constructor () {
    super()
    this.setRandomPages = this.setRandomPages.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  async setRandomPages () {
    let [from, to] = await random(2)
    this.setState({from, to})
  }

  handleClick () {
    let onGameStart = this.props.onGameStart
    if (onGameStart) {
      onGameStart({
        from: this.state.from,
        to: this.state.to
      })
    }
  }

  render (props, {from, to}) {
    return (
      <div style={{
        backgroundColor: '#4dd0e1',
        height: '100vh',
        width: '100vw'
      }}>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center'
        }}>
          <ExpandingInput placeholder='Starting Page'
            value={from}
            onInput={this.linkState('from')}
            style={INPUT_STYLE}
            spellCheck='false' />
          <span onClick={this.setRandomPages}
            class='wr-hover-underline'
            style={{
              color: '#ffffff',
              cursor: 'pointer',
              fontSize: '7.5vh'
            }}>to</span>
          <ExpandingInput placeholder='Ending Page'
            value={to}
            onInput={this.linkState('to')}
            onChange={e => console.log(e.target.value)}
            style={INPUT_STYLE}
            spellCheck='false' />
        </div>
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translate(-50%, -50%)',
          paddingBottom: '5vh'
        }}>
          <button class='wr-active-lorange'
            style={{
              cursor: 'pointer',
              fontSize: '5vh',
              padding: '1vh',
              color: '#ffffff',
              backgroundColor: '#ffab40',
              border: 0,
              outline: 'none'
            }}
            onClick={this.handleClick}>Race!
          </button>
        </div>
      </div>
    )
  }
}

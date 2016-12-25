/** @jsx h */

import {h, Component} from 'preact'

import {parse} from '../wikipedia'

import WikiFrame from './WikiFrame'

export default class GamePage extends Component {
  constructor () {
    super()
    this.handleNavigate = this.handleNavigate.bind(this)

    this.state = {
      path: []
    }
  }

  componentDidMount () {
    this.handleNavigate(this.props.from)
  }

  async handleNavigate (article) {
    let currentTitle = this.state.title
    let {html, title} = await parse(article)
    if (currentTitle === this.state.title) {
      console.log(`Navigating ${title}`)
      this.anchor.scrollIntoView()
      this.setState({
        html,
        title
      })

      // currentTitle is set after the first page has loaded
      if (currentTitle) {
        this.setState({
          path: [...this.state.path, title]
        })
      }
    } else {
      console.warn(`Skipping ${title}`)
    }
  }

  render ({from, to}, {html, title, path}) {
    return (
      <div style={{
        maxHeight: '100vh'
      }}>
        <nav style={{
          position: 'relative',
          color: '#ffffff',
          backgroundColor: '#4dd0e1',
          height: '7.5vh',
          fontSize: '2.5vh',
          width: '100vw',
        }}>
          <div style={{
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '100vw'
          }}>
            <div style={{
              position: 'absolute',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center'
            }}>{from} &#9654; {title || '¯\\_(ツ)_/¯'} &#9654; {to}</div>
            <div style={{
              position: 'absolute',
              right: 0,
              transform: 'translateY(-50%)',
              marginRight: '2vw'
            }}>
              {path.length} click{path.length === 1 ? '' : 's'}
            </div>
          </div>
        </nav>
        <div style={{
          height: '92.5vh',
          paddingLeft: '2vw',
          paddingRight: '2vw',
          maxWidth: '100vw',
          overflow: 'scroll'
        }}>
          <div ref={anchor => this.anchor = anchor}
               style={{
                 marginBottom: '2.5vh'
               }} />
          <WikiFrame html={html}
                     onNavigate={this.handleNavigate} />
        </div>
      </div>
    )
  }
}

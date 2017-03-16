import ExpandingInput from './ExpandingInput'
import Footer from './Footer'

import 'github-fork-ribbon-css/gh-fork-ribbon.css'

const INPUT_STYLE = {
  maxWidth: '100vw',
  fontSize: '3em',
  color: '#252525',
  backgroundColor: 'transparent',
  margin: 0,
  border: 0,
  boxSizing: 'content-box',
  outline: 'none'
}

export default function MenuView ({
  startPage,
  startPageInput,
  endPage,
  endPageInput,
  randomPages,
  startGame
}) {
  return (
    <div>
      <div style={{
        height: '100vh',
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid #eee'
      }}>
        <a
          href='https://github.com/btk5h/wikirace/'
          className='github-fork-ribbon right-top'
          title='Fork me on Github'>
          Fork me on Github
        </a>
        <div style={{
          display: 'flex',
          height: '100%',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          alignContent: 'center'
        }}>
          <h1 style={{
            fontSize: '10vh'
          }}>Wikirace</h1>
          <ExpandingInput
            placeholder='Starting Page'
            value={startPage}
            onInput={startPageInput}
            style={INPUT_STYLE}
            spellCheck='false' />
          <span
            onClick={randomPages}
            className='wr-hover-underline'
            style={{
              cursor: 'pointer',
              fontSize: '5vh'
            }}>
            to
          </span>
          <ExpandingInput
            placeholder='Ending Page'
            value={endPage}
            onInput={endPageInput}
            style={INPUT_STYLE}
            spellCheck='false' />
          <button onClick={startGame}>Play</button>
        </div>
      </div>
      <Footer />
    </div>
  )
}

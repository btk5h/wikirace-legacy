import GameBar from './GameBar'
import PreviewBar from './PreviewBar'
import WikiFrame from './WikiFrame'

export default function GameView (props) {
  return (
    <div>
      {props.view === 'GAME' ? <GameBar {...props} /> : <PreviewBar {...props} />}
      <div
        id='wr-scroll-container'
        style={{
          height: 'calc(100vh - 4em)',
          maxWidth: '100vw',
          overflow: 'scroll',
          WebkitOverflowScrolling: 'touch'
        }}>
        <a id='gamePageTop' />
        <div
          className='mw-body'
          style={{
            maxWidth: 1280,
            padding: 10,
            margin: '0 auto'
          }}>
          <WikiFrame {...props} />
        </div>
      </div>
    </div>
  )
}

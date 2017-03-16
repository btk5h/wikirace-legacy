export default function GameStartView ({
  startPage,
  endPage,
  startGame
}) {
  return (
    <div>
      <div style={{
        maxWidth: 600,
        margin: '0 auto',
        textAlign: 'center'
      }}>
        <h1>Wikirace!</h1>
        <p>
          Your goal is to go from <b>{startPage}</b> to <b>{endPage}</b> using the links found on
          each
          page. Try to get to the end page in the least number of clicks!
        </p>
        <p>
          <span style={{color: '#0645ad'}}>Blue links</span> will navigate to other Wikipedia pages.
          <br />
          <span style={{color: '#007767'}}>Green links</span> will scroll the current page to a
          different position. These links do not affect the score.
          <br />
          <span style={{color: '#ba0009'}}>Red links</span> are disabled.
        </p>
        <button onClick={startGame}>Start Game</button>
      </div>
    </div>
  )
}

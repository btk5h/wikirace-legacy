import AppBar from './AppBar'
import VirtualText from './VirtualText'
import LoadingBar from './LoadingBar'

export default function PreviewBar (props) {
  let isPreviewLoading = props.isLoading && !props.html
  return (
    <div
      onClick={props.startGame}
      style={{
        backgroundColor: '#f44336',
        color: '#fff',
        cursor: 'pointer'
      }}>
      <AppBar>
        <div style={{
          position: 'absolute',
          width: '100%',
          bottom: 0
        }}>
          {props.isLoading && <LoadingBar />}
        </div>
        <div style={{
          width: '10%'
        }} />
        <div style={{
          width: '80%',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <VirtualText>
            {
              isPreviewLoading
                ? 'Preview page loading...'
                : `Previewing end page, ${props.endPage}. You cannot click links on this page.`
            }
          </VirtualText>
          {!isPreviewLoading && <VirtualText>Click here to start the game.</VirtualText>}
        </div>
        <div style={{
          width: '10%'
        }} />
      </AppBar>
    </div>
  )
}

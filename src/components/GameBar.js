import AppBar from './AppBar'
import VirtualText from './VirtualText'
import LoadingBar from './LoadingBar'

export default function GameBar (props) {
  return (
    <div style={{
      backgroundColor: '#2196f3',
      color: '#fff'
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
          textAlign: 'center'
        }}>
          <VirtualText>{props.startPage}</VirtualText>
          <VirtualText> ► </VirtualText>
          <VirtualText>{props.currentPage}</VirtualText>
          <VirtualText> ► </VirtualText>
          <VirtualText>{props.endPage}</VirtualText>
        </div>
        <div style={{
          width: '10%'
        }}>
          <VirtualText>{props.score} clicks</VirtualText>
        </div>
      </AppBar>
    </div>
  )
}

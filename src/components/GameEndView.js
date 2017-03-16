export default function GameEndView (props) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <h1>Victory!</h1>
      <p>{props.score + 1} clicks</p>
      <div style={{
        margin: 10
      }}>{props.startPage}</div>
      {props.path.map(part => {
        return <div style={{
          margin: 10
        }}>{part}</div>
      })}
      <div style={{
        margin: 10
      }}>{props.endPage}</div>
    </div>
  )
}

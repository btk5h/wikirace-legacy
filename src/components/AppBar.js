export default function AppBar ({children}) {
  return (
    <nav
      id='wr-app-bar'
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        position: 'relative',
        height: '4em',
        fontSize: '1em',
        width: '100%'
      }}>
      {children}
    </nav>
  )
}

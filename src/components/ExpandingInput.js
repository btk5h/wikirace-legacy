import {Component} from 'preact'

export default class ExpandingInput extends Component {
  updateInheritedStyle () {
    // This won't work; Firefox does not compute font shorthand
    // this.setState({font: window.getComputedStyle(this.input).font})
    let computed = window.getComputedStyle(this.input)

    this.setState({
      inherited: {
        fontFamily: computed.fontFamily,
        fontSize: computed.fontSize
      }
    })
  }

  updateInputWidth () {
    let width = this.sizer.scrollWidth
    if (width !== this.state.width) {
      this.setState({width})
    }
  }

  componentDidMount () {
    this.updateInheritedStyle()
    this.updateInputWidth()
  }

  componentDidUpdate () {
    this.updateInputWidth()
  }

  handleInput = e => {
    this.props.onInput(e)
    this.updateInputWidth()
  }

  render ({value, placeholder, style, ...otherProps}, {width, inherited}) {
    return (
      <div>
        <input {...otherProps}
          ref={input => (this.input = input)}
          placeholder={placeholder}
          onInput={this.handleInput}
          value={value}
          style={{
            ...style,
            width
          }} />
        <div ref={sizer => (this.sizer = sizer)}
          style={{
            ...inherited,
            position: 'absolute',
            top: 0,
            left: 0,
            visibility: 'hidden',
            height: 0,
            paddingRight: 1,
            overflow: 'scroll',
            whiteSpace: 'pre'
          }}>
          {value || placeholder}
        </div>
      </div>
    )
  }
}

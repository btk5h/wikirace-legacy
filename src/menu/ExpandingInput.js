/** @jsx h */

import {h, Component} from 'preact'

export default class ExpandingInput extends Component {
  updateComputedFont () {
    this.setState({font: window.getComputedStyle(this.input).font})
  }

  updateInputWidth () {
    let width = this.sizer.scrollWidth
    if (width !== this.state.width) {
      this.setState({width})
    }
  }

  componentDidMount () {
    this.updateComputedFont()
    this.updateInputWidth()
  }

  componentDidUpdate () {
    this.updateInputWidth()
  }

  render ({value, placeholder, style, ...otherProps}, {width, font}) {
    return (
      <div>
        <input {...otherProps}
          ref={input => (this.input = input)}
          placeholder={placeholder}
          value={value}
          style={{
            ...style,
            width
          }} />
        <div ref={sizer => (this.sizer = sizer)}
          style={{
            font,
            position: 'absolute',
            top: 0,
            left: 0,
            visibility: 'hidden',
            height: 0,
            overflow: 'scroll',
            whiteSpace: 'pre'
          }}>
          {value || placeholder}
        </div>
      </div>
    )
  }
}

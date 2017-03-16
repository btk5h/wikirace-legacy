import {Component} from 'preact'

let nextId = 0

export default class VirtualText extends Component {
  updateText () {
    let sheet = this.stylesheet.sheet
    let rules = sheet.rules || sheet.cssRules
    if (rules.length > 0) {
      sheet.deleteRule(0)
    }

    sheet.insertRule(`#${this.id}:after {content: '${
      window.CSS.escape(this.props.children)
    }'}`, 0)
  }

  componentDidUnmount () {
    document.head.removeChild(this.stylesheet)
  }

  componentWillMount () {
    this.id = `wr-virtualtext-${nextId++}`
  }

  componentDidMount () {
    this.stylesheet = document.createElement('style')
    document.head.appendChild(this.stylesheet)

    this.updateText()
  }

  componentDidUpdate () {
    this.updateText()
  }

  render () {
    return <span id={this.id} />
  }
}

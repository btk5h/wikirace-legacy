/** @jsx h */

import {h, Component} from 'preact'

export default class InfoText extends Component {
  componentDidUnmount () {
    document.head.removeChild(this.stylesheet)
  }

  updateText () {
    let sheet = this.stylesheet.sheet
    if (sheet.rules.length > 0) {
      sheet.deleteRule(0)
    }

    sheet.insertRule(`#${this.props.id}:after {content: '${
      window.CSS.escape(this.props.content)
    }'}`, 0)
  }

  render ({content, ...props}) {
    if (!this.stylesheet) {
      this.stylesheet = document.createElement('style')
      document.head.appendChild(this.stylesheet)
    }

    this.updateText()

    return <span {...props} />
  }
}

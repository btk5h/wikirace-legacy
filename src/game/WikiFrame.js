/** @jsx h */

import {h, Component} from 'preact'

function getEffectiveLink (node) {
  return node == null || node.nodeName === 'A' && node.getAttribute('href')
    ? node : getEffectiveLink(node.parentNode)
}

export default class WikiFrame extends Component {
  constructor () {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick (e) {
    e.preventDefault()

    let link = getEffectiveLink(e.target)

    if (link) {
      let href = link.getAttribute('href')
      let title = link.getAttribute('title')
      let classList = link.classList

      if (href) {
        if (href.startsWith('#')) {
          let el = document.getElementById(href.substr(1))

          if (el) {
            el.scrollIntoView({behavior: 'smooth'})
          }
        } else if (!(classList.contains('extiw') ||
          classList.contains('external') ||
          classList.contains('new')) && title) {
          let onNavigate = this.props.onNavigate

          if (onNavigate) {
            onNavigate(link.getAttribute('title'), {
              isDisambiguation: classList.contains('mw-disambig')
            })
          }
        }
      }
    }
  }

  render ({html, style}) {
    return (
      <article dangerouslySetInnerHTML={{__html: html}}
        onClick={this.handleClick} />
    )
  }
}

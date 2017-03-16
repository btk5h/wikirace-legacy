import {Component} from 'preact'

import {reveal} from '../scroll'

const HREF = '__wr_href'

export default class WikiFrame extends Component {
  handleClick = (e) => {
    e.preventDefault()

    let link = e.target.closest(`a[${HREF}]`)

    if (link) {
      let href = link.getAttribute(HREF)
      let title = link.getAttribute('title')
      let classList = link.classList

      if (href) {
        if (href.startsWith('#')) {
          let el = document.getElementById(href.substr(1))

          if (el) {
            reveal(el)
          }
        } else if (!(
            classList.contains('extiw') ||
            classList.contains('external') ||
            classList.contains('internal') ||
            classList.contains('new')
          ) && title) {
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

  componentDidMount () {
    this.componentDidUpdate()
  }

  componentDidUpdate () {
    this.wrapper.querySelectorAll('a[href]')
      .forEach(link => {
        link.setAttribute(HREF, link.getAttribute('href'))
        link.removeAttribute('href')
      })
  }

  render ({html}) {
    return (
      <article
        ref={wrapper => (this.wrapper = wrapper)}
        dangerouslySetInnerHTML={{__html: html}}
        onClick={this.handleClick} />
    )
  }
}

export class TestResultsElement extends HTMLElement {
  constructor () {
    super()
    this.startTime = null
    this.shadow = this.attachShadow({mode: 'open'})
  }

  get containerEl () {
    return this.shadow.querySelector('.container')
  }

  log (cls, text, code) {
    var el = document.createElement('div')
    el.className = cls
    el.textContent = text
    if (code) {
      let codeEl = document.createElement('span')
      codeEl.innerHTML = code
      el.prepend(codeEl)
    }
    this.containerEl.append(el)
  }

  reset () {
    this.shadow.innerHTML = `
      <link rel="stylesheet" href="/com/test-results.css">
      <h2>Results</h2>
      <div class="container"></div>
    `
    this.startTime = Date.now()
  }

  notice (str) {
    this.log('notice', str)
  }

  skip (str) {
    this.log('skip', str, '&raquo;')
  }

  pass (str) {
    this.log('pass', str, '&check;')
  }

  fail (str) {
    this.log('fail', str, '&cross;')
  }

  error (e) {
    console.error(e)
    this.log('error', e.toString())
  }

  finish () {
    var s = (Date.now() - this.startTime) / 1e3
    this.log('notice', `Finished in ${s} seconds`)
  }

  static register () {
    customElements.define('test-results', TestResultsElement)
  }
}
export class SetupFormElement extends HTMLElement {
  constructor () {
    super()

    this.shadow = this.attachShadow({mode: 'open'})
    this.shadow.innerHTML = `
      <link rel="stylesheet" href="/com/setup-form.css">
      <form>
        <p>Input the URL of your test script:</p>
        <div><input name="url"></div>
        <div class="error"></div>
        <div><button type="submit">Start</button></div>
      </form>
    `

    var urlParams = new URLSearchParams(window.location.search)
    if (urlParams.get('test_url')) {
      this.urlInput.setAttribute('value', urlParams.get('test_url'))
    }

    this.formEl.addEventListener('submit', e => {
      e.preventDefault()
      this.render()

      // validate url input
      var url = (this.formEl.url.value).trim()
      if (!url) return this.render({err: 'URL is required'})
      try { url = new URL(url, window.location.origin) }
      catch (err) { return this.render({err}) }

      // set query param
      urlParams.set('test_url', url.toString())
      history.replaceState({}, null, '/?' + urlParams.toString())

      // dispatch
      var detail = {url}
      this.dispatchEvent(new CustomEvent('run', {bubbles: true, detail}))
    })
  }

  get formEl () {
    return this.shadow.querySelector('form')
  }

  get urlInput () {
    return this.shadow.querySelector('input[name="url"]')
  }

  get errorEl () {
    return this.shadow.querySelector('.error')
  }

  render ({err} = {}) {
    this.errorEl.textContent = err
  }

  static register () {
    customElements.define('setup-form', SetupFormElement)
  }
}
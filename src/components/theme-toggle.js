import { LitElement, html, css } from 'lit'

class ThemeToggle extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
    }
    .switch {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
      font-family: system-ui, sans-serif;
    }
    .knob {
      width: 38px;
      height: 22px;
      background: #ddd;
      border-radius: 999px;
      position: relative;
    }
    .knob::after {
      content: '';
      position: absolute;
      top: 3px;
      left: 3px;
      width: 16px;
      height: 16px;
      background: white;
      border-radius: 50%;
      transition: left 0.18s;
    }
    :host([dark]) .knob {
      background: #111827;
    }
    :host([dark]) .knob::after {
      left: 19px;
    }
  `

  static properties = { dark: { type: Boolean, reflect: true } }

  constructor() {
    super()
    this.dark = false
  }

  createRenderRoot() {
    return super.createRenderRoot()
  }

  toggle() {
    this.dark = !this.dark
    document.body.classList.toggle('theme-dark', this.dark)
    window.dispatchEvent(
      new CustomEvent('app-theme-changed', { detail: { dark: this.dark } }),
    )
  }

  render() {
    return html`<div
      class="switch"
      @click=${this.toggle}
      role="button"
      tabindex="0"
    >
      <div class="knob" aria-hidden></div>
      <small>${this.dark ? 'Dark' : 'Light'}</small>
    </div>`
  }
}

customElements.define('theme-toggle', ThemeToggle)

export { ThemeToggle }

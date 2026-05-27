import { LitElement, html, css } from 'lit'

class DevBadge extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
    }
    .badge-wrap {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.4rem 0.6rem;
      border-radius: 999px;
      background: linear-gradient(90deg, #1d4ed8, #0f766e);
      color: white;
      font-weight: 600;
      box-shadow: 0 6px 18px rgba(15, 118, 110, 0.18);
      font-family: system-ui, sans-serif;
    }
    .dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #fff8;
    }
  `

  createRenderRoot() {
    return super.createRenderRoot()
  }

  render() {
    return html`
      <span class="badge-wrap">
        <span class="dot"></span>
        <span>Developer</span>
      </span>
    `
  }
}

customElements.define('dev-badge', DevBadge)

export { DevBadge }

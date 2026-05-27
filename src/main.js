import * as bootstrap from 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './components/nav-bar.js'
import './pages/dashboard.js'
import './pages/add-story.js'
import './pages/about-dev.js'
import './components/footer-app.js'
import './styles/main.scss'

const app = document.querySelector('#app')

app.innerHTML = `
  <nav-bar></nav-bar>
  <div id="page"></div>
`

function renderRoute() {
  const page = app.querySelector('#page')
  const hash = window.location.hash || '#'
  if (hash.startsWith('#add')) {
    page.innerHTML = '<add-story-page></add-story-page>'
  } else if (hash.startsWith('#about')) {
    page.innerHTML = '<about-dev></about-dev>'
  } else {
    page.innerHTML = '<dashboard-page></dashboard-page>'
  }
}

window.addEventListener('hashchange', renderRoute)
renderRoute()

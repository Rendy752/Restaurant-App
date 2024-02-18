import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.scss';
import '../public/data/DATA.json';
import App from './views/app';

const app = new App({
  button: document.querySelector('#hamburger-menu'),
  drawer: document.querySelector('#navigation-drawer'),
  content: document.querySelector('#main-content'),
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
});

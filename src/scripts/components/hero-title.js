class HeroTitle extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <div class="title hero">
          <img src="./images/heros/hero-image_2.jpg" alt="Hero image" />
          <h1>Restaurant App</h1>
          <h2 class="motto">Discover every restaurant in the country</h2>
        </div>
      `;
  }
}

customElements.define('hero-title', HeroTitle);

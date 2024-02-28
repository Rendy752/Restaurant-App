class HeroTitle extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <div class="title hero">
          <picture>
            <source media="(max-width: 600px)" srcset="./images/heros/hero-image_2-small.jpg">
            <img src="./images/heros/hero-image_2-large.jpg" alt="Hero image" />
          </picture>
          <h1>Restaurant App</h1>
          <h2 class="motto">Discover every restaurant in the country</h2>
        </div>
      `;
  }
}

customElements.define('hero-title', HeroTitle);

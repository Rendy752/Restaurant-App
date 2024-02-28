/* eslint-disable import/no-extraneous-dependencies */
import API_ENDPOINT from '../globals/api-endpoint';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

class DiscoverMore extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <section>
          <div class="title">
            <h2>Discover More</h2>
          </div>
          <div class="restaurant-image-container">
            <div id="sentinel"></div>
          </div>
        </section>
      `;

    let imageIndex = 10;
    const restaurantImageContainer = this.querySelector(
      '.restaurant-image-container',
    );

    const loadMoreContent = () => {
      const newImage = document.createElement('img');
      newImage.dataset.src = `${API_ENDPOINT.BASE_IMAGE_URL}/${imageIndex}`;
      newImage.classList.add('lazyload');
      newImage.alt = `Restaurant Image ${imageIndex}`;
      newImage.width = 400;

      restaurantImageContainer.appendChild(newImage);

      if (imageIndex === 45) {
        imageIndex = 10;
      } else {
        imageIndex += 1;
      }
    };

    let autoScrollInterval;
    const startAutoScroll = () => {
      autoScrollInterval = setInterval(() => {
        if (
          restaurantImageContainer.scrollLeft +
            restaurantImageContainer.offsetWidth >=
          restaurantImageContainer.scrollWidth
        ) {
          loadMoreContent();
        }

        restaurantImageContainer.scrollLeft += 1;
      }, 20);
    };

    startAutoScroll();

    document.querySelectorAll('a').forEach((anchor) => {
      anchor.addEventListener('click', () => {
        document.querySelector('ul').classList = '';
        clearInterval(autoScrollInterval);
        setTimeout(startAutoScroll, 1000);
      });
    });
  }
}

customElements.define('discover-more', DiscoverMore);

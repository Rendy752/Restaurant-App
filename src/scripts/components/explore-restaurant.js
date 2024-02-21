import API_ENDPOINT from '../globals/api-endpoint';
import DataErrorHandler from '../utils/data-error-handler';
import ScrollRestaurantItem from '../utils/scroll-restaurant-item';
import './loading-indicator';

class ExploreRestaurant extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <section id="home">
          <div class="title">
            <h2>Explore Restaurant</h2>
            <h3>Find the best restaurant in your area</h3>
          </div>
          <div id="restaurant-item-container"></div>
        </section>
      `;

    const restaurantContainer = document.getElementById(
      'restaurant-item-container',
    );
    const loadingIndicator = document.createElement('loading-indicator');
    const homeContainer = document.getElementById('home');
    homeContainer.appendChild(loadingIndicator);
    fetch(API_ENDPOINT.LIST)
      .then((response) => response.json())
      .then((data) => {
        homeContainer.removeChild(loadingIndicator);
        ScrollRestaurantItem(restaurantContainer, data.restaurants);
      })
      .catch(() => {
        homeContainer.removeChild(loadingIndicator);
        DataErrorHandler(homeContainer);
      });
  }
}

customElements.define('explore-restaurant', ExploreRestaurant);

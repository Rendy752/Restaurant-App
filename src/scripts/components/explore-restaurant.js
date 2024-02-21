import API_ENDPOINT from '../globals/api-endpoint';
import ScrollRestaurantItem from '../utils/scroll-restaurant-item';

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
    fetch(API_ENDPOINT.LIST)
      .then((response) => response.json())
      .then((data) => {
        ScrollRestaurantItem(restaurantContainer, data.restaurants);
      })
      .catch((error) => {
        const errorMessage = document.createElement('p');
        errorMessage.textContent = `Error: ${error}`;
        if (restaurantContainer) {
          restaurantContainer.appendChild(errorMessage);
        }
      });
  }
}

customElements.define('explore-restaurant', ExploreRestaurant);
export default ExploreRestaurant;

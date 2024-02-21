import FavoriteRestaurantIdb from '../../public/data/favorite-restaurant-idb';
import ScrollRestaurantItem from '../utils/scroll-restaurant-item';

class FavoriteRestaurant extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <section id="home">
          <div class="title">
            <h2>Favorite Restaurant</h2>
          </div>
          <div id="restaurant-item-container"></div>
        </section>
      `;

    const restaurantContainer = document.getElementById(
      'restaurant-item-container',
    );
    FavoriteRestaurantIdb.getAllRestaurants()
      .then((data) => {
        ScrollRestaurantItem(restaurantContainer, data);
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

customElements.define('favorite-restaurant', FavoriteRestaurant);
export default FavoriteRestaurant;

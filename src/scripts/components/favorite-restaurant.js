import FavoriteRestaurantIdb from '../../public/data/favorite-restaurant-idb';
import DataErrorHandler from '../utils/data-error-handler';
import ScrollRestaurantItem from '../utils/scroll-restaurant-item';
import './loading-indicator';

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
    const loadingIndicator = document.createElement('loading-indicator');
    const homeContainer = document.getElementById('home');
    homeContainer.appendChild(loadingIndicator);
    FavoriteRestaurantIdb.getAllRestaurants()
      .then((data) => {
        homeContainer.removeChild(loadingIndicator);
        if (data.length === 0) {
          const titleContainer = document.querySelector('.title');
          titleContainer.innerHTML +=
            '<div class="error-message">There is no favorite restaurant yet.</div>';
        } else {
          ScrollRestaurantItem(restaurantContainer, data);
        }
      })
      .catch(() => {
        homeContainer.removeChild(loadingIndicator);
        DataErrorHandler(homeContainer);
      });
  }
}

customElements.define('favorite-restaurant', FavoriteRestaurant);

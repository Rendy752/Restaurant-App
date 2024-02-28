/* eslint-disable import/no-extraneous-dependencies */
import API_ENDPOINT from '../globals/api-endpoint';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

class RestaurantItem extends HTMLElement {
  set restaurant(restaurant) {
    this._restaurant = restaurant;
    this.render();
  }

  render() {
    this.innerHTML = `
        <div>
          <a href="#/detail/${this._restaurant.id}">
          <img class="lazyload" data-src="${API_ENDPOINT.BASE_IMAGE_URL}/${this._restaurant.pictureId}" alt="${this._restaurant.name}" />
          <p>Kota ${this._restaurant.city}</p>
          <div class="restaurant-item-body">
            <h3 class="rating">Rating: ${this._restaurant.rating}</h3>
            <h3>${this._restaurant.name}</h3>
            <p>${this._restaurant.description}</p>
          </div>
          </a>
        </div>
      `;
  }
}

customElements.define('restaurant-item', RestaurantItem);

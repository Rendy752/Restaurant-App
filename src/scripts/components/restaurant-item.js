class RestaurantItem extends HTMLElement {
  set restaurant(restaurant) {
    this._restaurant = restaurant;
    this.render();
  }

  render() {
    this.innerHTML = `
        <img src="${this._restaurant.pictureId}" alt="${this._restaurant.name}" />
        <p>Kota ${this._restaurant.city}</p>
        <div class="restaurant-item-body">
          <h3 class="rating">Rating: ${this._restaurant.rating}</h3>
          <h3>${this._restaurant.name}</h3>
          <p>${this._restaurant.description}</p>
        </div>
      `;
  }
}

customElements.define('restaurant-item', RestaurantItem);
export default RestaurantItem;

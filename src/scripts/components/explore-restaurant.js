import API_ENDPOINT from '../globals/api-endpoint';
import './restaurant-item';

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
        data.restaurants.forEach((restaurant) => {
          const restaurantDiv = document.createElement('div');
          restaurantDiv.classList.add('restaurant-item');
          const restaurantItemElement =
            document.createElement('restaurant-item');
          restaurantItemElement.restaurant = restaurant;
          restaurantDiv.innerHTML = restaurantItemElement.outerHTML;
          if (restaurantContainer) {
            restaurantContainer.appendChild(restaurantDiv);
            window.addEventListener('scroll', () => {
              const position = restaurantDiv.getBoundingClientRect();
              if (position.top <= window.innerHeight) {
                restaurantDiv.classList.add('popUpScale');
              }
            });
          } else {
            const errorMessage = document.createElement('p');
            errorMessage.textContent = 'Restaurant container not found';
            if (restaurantContainer) {
              restaurantContainer.appendChild(errorMessage);
            }
          }
        });
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

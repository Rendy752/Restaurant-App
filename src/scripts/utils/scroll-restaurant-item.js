import '../components/restaurant-item';

const ScrollRestaurantItem = (restaurantContainer, data) => {
  data.forEach((restaurant) => {
    const restaurantDiv = document.createElement('div');
    restaurantDiv.classList.add('restaurant-item');
    const restaurantItemElement = document.createElement('restaurant-item');
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
};

export default ScrollRestaurantItem;

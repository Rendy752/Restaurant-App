import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.scss';
import '../public/data/DATA.json';

document
  .querySelector('.hamburger-menu')
  .addEventListener('click', function () {
    document.querySelector('ul').classList.toggle('open');
  });

let imageIndex = 10;
const restaurantImageContainer = document.querySelector(
  '.restaurant-image-container',
);
function loadMoreContent() {
  const newImage = document.createElement('img');
  newImage.src = `https://restaurant-api.dicoding.dev/images/medium/${imageIndex}`;
  newImage.alt = `Restaurant Image ${imageIndex}`;
  newImage.width = 400;

  restaurantImageContainer.appendChild(newImage);

  if (imageIndex === 45) {
    imageIndex = 10;
  } else {
    imageIndex++;
  }
}

let autoScrollInterval;

function startAutoScroll() {
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
}
startAutoScroll();

document.querySelectorAll('a').forEach((anchor) => {
  anchor.addEventListener('click', () => {
    document.querySelector('ul').classList = '';
    clearInterval(autoScrollInterval);
    setTimeout(startAutoScroll, 1000);
  });
});

const restaurantContainer = document.getElementById(
  'restaurant-item-container',
);
fetch('/data/DATA.json')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    data.restaurants.forEach((restaurant) => {
      const restaurantDiv = document.createElement('div');
      restaurantDiv.classList.add('restaurant-item');
      restaurantDiv.innerHTML = `
              <img src="${restaurant.pictureId}" alt="${restaurant.name}" />
              <p>Kota ${restaurant.city}</p>
              <div class="restaurant-item-body">
                <h3 class="rating">Rating: ${restaurant.rating}</h3>
                <h3>${restaurant.name}</h3>
                <p>${restaurant.description}</p>
              </div>
            `;
      if (restaurantContainer) {
        restaurantContainer.appendChild(restaurantDiv);
        window.addEventListener('scroll', function () {
          var position = restaurantDiv.getBoundingClientRect();
          if (position.top <= window.innerHeight) {
            restaurantDiv.classList.add('popUpScale');
          }
        });
      } else {
        console.log('Restaurant container not found');
      }
    });
  })
  .catch((error) => {
    console.log(error);
  });

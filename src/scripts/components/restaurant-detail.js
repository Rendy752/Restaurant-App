import UrlParser from '../routes/url-parser';
import RestaurantAppSource from '../../public/data/restaurantapp-source';
import LikeButtonInitiator from '../utils/like-button-inititator';
import API_ENDPOINT from '../globals/api-endpoint';

class RestaurantDetail extends HTMLElement {
  constructor() {
    super();
    this._restaurant = null;
  }

  async connectedCallback() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    this._restaurant = await RestaurantAppSource.detailRestaurant(url.id);
    this.render();
  }

  render() {
    const {
      name,
      city,
      rating,
      pictureId,
      address,
      categories,
      description,
      menus,
      customerReviews,
    } = this._restaurant;
    this.innerHTML = `
        <h1>Restaurant Detail</h1>
        ${
          this._restaurant
            ? `
            <div id="restaurant-detail">
                <h2>${name}</h2>
                <img src="${
                  API_ENDPOINT.BASE_IMAGE_URL
                }/${pictureId}" alt="${name}" />
                <h3>City: ${city}</h3>
                <h3>Rating: ${rating}</h3>
                <h3>Address: ${address}</h3>
                <h3>Categories: ${categories
                  .map((category) => category.name)
                  .join(', ')}</h3>
                <h3>Description:</h3>
                <p>${description}</p>
                <h3>Menus:</h3>
                <h4>Foods:</h4>
                <ul>
                    ${menus.foods
                      .map((food) => `<li>${food.name}</li>`)
                      .join('')}
                </ul>
                <h4>Drinks:</h4>
                <ul>
                    ${menus.drinks
                      .map((drink) => `<li>${drink.name}</li>`)
                      .join('')}
                </ul>
                <h3>Customer Reviews:</h3>
                <ul>
                    ${customerReviews
                      .map(
                        (review) => `
                    <li>
                        <h4>${review.name}</h4>
                        <p>${review.review}</p>
                        <p>${review.date}</p>
                    </li>
                    `,
                      )
                      .join('')}
                </ul>
                <div id="like-button-container">
                <button>LIKE</button>
                </div>
            </div>
            `
            : '<h2>Restaurant detail not found. Please try again later.</h2>'
        }
      `;

    if (this._restaurant) {
      const likeButtonContainer = this.querySelector('#like-button-container');
      LikeButtonInitiator.init(likeButtonContainer, this._restaurant);
    }
  }
}

customElements.define('restaurant-detail', RestaurantDetail);

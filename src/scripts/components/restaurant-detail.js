import UrlParser from '../routes/url-parser';
import RestaurantAppSource from '../../public/data/restaurantapp-source';
import LikeButtonInitiator from '../utils/like-button-inititator';
import API_ENDPOINT from '../globals/api-endpoint';
import './add-review';

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
      id,
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
        ${
          this._restaurant
            ? `
            <div id="restaurant-detail">
            <div class="restaurant-detail-header">
            <div class="restaurant-detail-image-container">
              <img src="${
                API_ENDPOINT.BASE_IMAGE_URL
              }/${pictureId}" alt="${name}" />
              <button id="like-button-container"><span id="heart-icon">❤</span> ${rating}</button>
            </div>
              <h2 class="restaurant-name">${name}</h2>
              <h3 class="restaurant-address">${address}, ${city}</h3>
              <div class="restaurant-categories-container">
              ${categories
                .map(
                  (category) =>
                    `<span class="restaurant-categories">${category.name}</span>`,
                )
                .join('')}
            </div>
            <hr>
            </div>
                <p class="restaurant-description">${description}</p>
                <div class="menus-container">
                  <div>
                    <h2>Foods</h2>
                    <ul>
                        ${menus.foods
                          .map((food) => `<li>${food.name}</li>`)
                          .join('')}
                    </ul>
                  </div>
                  <div>
                    <h2>Drinks</h2>
                    <ul>
                        ${menus.drinks
                          .map((drink) => `<li>${drink.name}</li>`)
                          .join('')}
                    </ul>
                  </div>
                </div>
                <hr>
                <div class="reviews-container">
                  <h3>${customerReviews.length} Reviews</h3>
                  <div class="add-reviews-container"></div>
                  <ul class="customer-reviews">
                      ${customerReviews
                        .map(
                          (review) => `
                      <li>
                          <div class="review-header">
                            <img src="/images/profile.png" alt="Profile" />
                            <div class="review-info">
                              <p class="reviewer-name">${review.name}</p>
                              <p class="review-date">~ ${review.date}</p>
                            </div>
                          </div>
                          <p class="reviewer-review">${review.review}</p>
                      </li>
                      `,
                        )
                        .join('')}
                  </ul>
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

    const addReviewContainer = this.querySelector('.add-reviews-container');
    const addReviewElement = document.createElement('add-review');
    addReviewElement.id = id;
    addReviewContainer.appendChild(addReviewElement);
  }
}

customElements.define('restaurant-detail', RestaurantDetail);

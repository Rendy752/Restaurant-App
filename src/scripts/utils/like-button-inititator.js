import FavoriteRestaurantIdb from '../../public/data/favorite-restaurant-idb';
// import {
//   createLikeButtonTemplate,
//   createLikedButtonTemplate,
// } from '../views/templates/template-creator';

const LikeButtonInitiator = {
  async init(likeButtonContainer, restaurant) {
    this._likeButtonContainer = likeButtonContainer;
    this._restaurant = restaurant;

    await this._renderButton();
  },

  async _renderButton() {
    const { id } = this._restaurant;
    console.log(id);

    if (await this._isRestaurantExist(id)) {
      this._renderLiked();
    } else {
      this._renderLike();
    }
  },

  async _isRestaurantExist(id) {
    const restaurant = await FavoriteRestaurantIdb.getRestaurant(id);
    return !!restaurant;
  },

  _renderLike() {
    const heartIcon = document.getElementById('heart-icon');
    heartIcon.classList.remove('active');

    const likeButtonContainer = document.getElementById(
      'like-button-container',
    );
    likeButtonContainer.setAttribute('aria-label', 'Like this restaurant');
    likeButtonContainer.addEventListener('click', async () => {
      await FavoriteRestaurantIdb.putRestaurant(this._restaurant);
      this._renderButton();
    });
  },

  _renderLiked() {
    const heartIcon = document.getElementById('heart-icon');
    heartIcon.classList.add('active');

    const likeButtonContainer = document.getElementById(
      'like-button-container',
    );
    likeButtonContainer.setAttribute('aria-label', 'Unlike this restaurant');
    likeButtonContainer.addEventListener('click', async () => {
      await FavoriteRestaurantIdb.deleteRestaurant(this._restaurant.id);
      this._renderButton();
    });
  },
};

export default LikeButtonInitiator;

import FavoriteRestaurantIdb from '../../public/data/favorite-restaurant-idb';

const LikeButtonInitiator = {
  async init(likeButtonContainer, restaurant) {
    this._likeButtonContainer = likeButtonContainer;
    this._restaurant = restaurant;

    await this._renderButton();
  },

  async _renderButton() {
    if (!this._restaurant) {
      throw new Error('Restaurant is not defined');
    }

    const { id } = this._restaurant;

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
    if (heartIcon) {
      heartIcon.classList.remove('active');
    } else {
      console.error('Element with id "heart-icon" not found');
    }

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
    if (heartIcon) {
      heartIcon.classList.add('active');
    } else {
      console.error('Element with id "heart-icon" not found');
    }

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

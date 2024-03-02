import LikeButtonInitiator from '../src/scripts/utils/like-button-inititator';
import FavoriteRestaurantIdb from '../src/public/data/favorite-restaurant-idb';

describe('Liking A Restaurant', () => {
  const addLikeButtonContainer = () => {
    document.body.innerHTML = '<div id="like-button-container"></div>';
  };

  beforeEach(() => {
    addLikeButtonContainer();
  });

  it('should show the like button when the restaurant has not been liked before', async () => {
    await LikeButtonInitiator.init(
      document.getElementById('like-button-container'),
      { id: 1 },
    );

    expect(
      document.querySelector('[aria-label="Like this restaurant"]'),
    ).toBeTruthy();
  });

  it('should not show the unlike button when the restaurant has not been liked before', async () => {
    await LikeButtonInitiator.init(
      document.getElementById('like-button-container'),
      { id: 1 },
    );

    expect(
      document.querySelector('[aria-label="Unlike this restaurant"]'),
    ).toBeFalsy();
  });

  it('should be able to like the restaurant', async () => {
    await LikeButtonInitiator.init(
      document.getElementById('like-button-container'),
      { id: 1 },
    );

    document
      .querySelector('[aria-label="Like this restaurant"]')
      .dispatchEvent(new Event('click'));

    const restaurant = await FavoriteRestaurantIdb.getRestaurant(1);
    expect(restaurant).toEqual({ id: 1 });
    await FavoriteRestaurantIdb.deleteRestaurant(1);
  });

  it('should not add a restaurant again when its already liked', async () => {
    await LikeButtonInitiator.init(
      document.getElementById('like-button-container'),
      { id: 1 },
    );

    await FavoriteRestaurantIdb.putRestaurant({ id: 1 });
    document
      .querySelector('#like-button-container')
      .dispatchEvent(new Event('click'));

    expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([
      { id: 1 },
    ]);
    await FavoriteRestaurantIdb.deleteRestaurant(1);
  });

  it('should not add a restaurant when it has no id', async () => {
    const restaurant = {};

    try {
      await LikeButtonInitiator.init({
        likeButtonContainer: document.querySelector('#like-button-container'),
        favoriteRestaurants: FavoriteRestaurantIdb,
        restaurant,
      });
    } catch (error) {
      expect(error).toEqual(new Error('Restaurant is not defined'));
    }

    document
      .querySelector('#like-button-container')
      .dispatchEvent(new Event('click'));

    expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([]);
  });
});

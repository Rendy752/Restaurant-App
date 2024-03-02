import LikeButtonInitiator from '../src/scripts/utils/like-button-inititator';
import FavoriteRestaurantIdb from '../src/public/data/favorite-restaurant-idb';

describe('Unliking A Restaurant', () => {
  const addLikeButtonContainer = () => {
    document.body.innerHTML = '<div id="like-button-container"></div>';
  };

  beforeEach(() => {
    addLikeButtonContainer();
    const heartIcon = document.createElement('div');
    heartIcon.id = 'heart-icon';
    document.body.appendChild(heartIcon);
    const unlikeButton = document.createElement('button');
    unlikeButton.setAttribute('aria-label', 'Unlike this restaurant');
    document.body.appendChild(unlikeButton);
  });

  afterEach(async () => {
    await FavoriteRestaurantIdb.deleteRestaurant(1);
    document.body.innerHTML = '';
  });

  it('should show the unlike button when the restaurant has been liked', async () => {
    await FavoriteRestaurantIdb.putRestaurant({ id: 1 });
    await LikeButtonInitiator.init(
      document.getElementById('like-button-container'),
      { id: 1 },
    );

    expect(
      document.querySelector('[aria-label="Unlike this restaurant"]'),
    ).toBeTruthy();
  });

  it('should not show the like button when the restaurant has been liked', async () => {
    await FavoriteRestaurantIdb.putRestaurant({ id: 1 });
    await LikeButtonInitiator.init(
      document.getElementById('like-button-container'),
      { id: 1 },
    );

    expect(
      document.querySelector('[aria-label="Like this restaurant"]'),
    ).toBeFalsy();
  });

  it('should be able to remove liked restaurant from the list', async () => {
    await FavoriteRestaurantIdb.putRestaurant({ id: 1 });
    await LikeButtonInitiator.init(
      document.getElementById('like-button-container'),
      { id: 1 },
    );

    document
      .querySelector('[aria-label="Unlike this restaurant"]')
      .dispatchEvent(new Event('click'));

    const restaurant = await FavoriteRestaurantIdb.getRestaurant(1);
    expect(restaurant).toEqual(undefined);
  });

  it('should not throw error when user click unlike widget if the unliked restaurant is not in the list', async () => {
    await LikeButtonInitiator.init(
      document.getElementById('like-button-container'),
      { id: 1 },
    );

    await FavoriteRestaurantIdb.deleteRestaurant(1);

    document
      .querySelector('[aria-label="Unlike this restaurant"]')
      .dispatchEvent(new Event('click'));

    expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([]);
  });
});

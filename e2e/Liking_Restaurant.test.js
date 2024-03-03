const assert = require('assert');

Feature('Liking Restaurant');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('showing empty liked restaurant', ({ I }) => {
  I.seeElement('.error-message');
  I.see('There is no favorite restaurant yet.', '.error-message');
});

Scenario('liking one restaurant', async ({ I }) => {
  I.see('There is no favorite restaurant yet.', '.error-message');
  I.amOnPage('/');
  I.seeElement('restaurant-item div a');
  const firstRestaurantTitle = await I.grabTextFrom(
    locate('.restaurant-item-body h3:nth-child(2)').first(),
  );
  I.click(locate('restaurant-item div a').first());

  I.seeElement('#like-button-container');
  I.click('#like-button-container');

  I.amOnPage('/#/favorite');
  I.seeElement('.restaurant-item');
  const likedRestaurantTitle = await I.grabTextFrom(
    locate('.restaurant-item-body h3:nth-child(2)').first(),
  );

  assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle);
});

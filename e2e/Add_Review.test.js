Feature('Add Review');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('showing empty liked restaurant', ({ I }) => {
  I.see('There is no favorite restaurant yet.', '.error-message');
});

Scenario('add review', async ({ I }) => {
  I.see('There is no favorite restaurant yet.', '.error-message');
  I.amOnPage('/');
  I.seeElement('restaurant-item div a');
  I.click(locate('restaurant-item div a').first());
  I.seeElement('#review-form');
  I.fillField('input[name="name"]', 'John Doe');
  I.fillField('textarea[name="review"]', 'This restaurant is awesome!');
  I.click('button[type="submit"]');
  I.seeInPopup('Review berhasil ditambahkan');
});

Scenario('add review without name', async ({ I }) => {
  I.see('There is no favorite restaurant yet.', '.error-message');
  I.amOnPage('/');
  I.seeElement('restaurant-item div a');
  I.click(locate('restaurant-item div a').first());
  I.seeElement('#review-form');
  I.fillField('textarea[name="review"]', 'This restaurant is awesome!');
  I.click('button[type="submit"]');
  I.seeAttributesOnElements('input', { required: true });
});

Scenario('add review without review', async ({ I }) => {
  I.see('There is no favorite restaurant yet.', '.error-message');
  I.amOnPage('/');
  I.seeElement('restaurant-item div a');
  I.click(locate('restaurant-item div a').first());
  I.seeElement('#review-form');
  I.fillField('input[name="name"]', 'John Doe');
  I.click('button[type="submit"]');
  I.seeAttributesOnElements('textarea', { required: true });
});

Scenario('add review without name and review', async ({ I }) => {
  I.see('There is no favorite restaurant yet.', '.error-message');
  I.amOnPage('/');
  I.seeElement('restaurant-item div a');
  I.click(locate('restaurant-item div a').first());
  I.seeElement('#review-form');
  I.click('button[type="submit"]');
  I.seeAttributesOnElements('input', { required: true });
  I.seeAttributesOnElements('textarea', { required: true });
});

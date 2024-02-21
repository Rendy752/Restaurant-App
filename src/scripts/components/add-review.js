import API_ENDPOINT from '../globals/api-endpoint';

class AddReview extends HTMLElement {
  set id(value) {
    this._id = value;
    this.render();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <form id="review-form">
        <div class="input-container">
          <label for="name"></label>
          <input type="text" id="name" name="name" placeholder="Name..." required>

          <label for="review"></label>
          <textarea id="review" name="review" placeholder="Review..." required></textarea>
        </div>

        <button type="submit">Post</button>
      </form>
    `;

    this.querySelector('#review-form').addEventListener('submit', (event) => {
      event.preventDefault();

      const id = this._id;
      const name = document.getElementById('name').value;
      const review = document.getElementById('review').value;

      const data = JSON.stringify({ id, name, review });

      fetch(API_ENDPOINT.ADD_REVIEW, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: data,
      })
        .then((response) => response.json())
        .then(() => {
          alert('Review berhasil ditambahkan');
        })
        .catch((error) => {
          alert('Error:', error);
        });
    });
  }
}

customElements.define('add-review', AddReview);

class AddReview extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <form>
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" required>

        <label for="review">Review:</label>
        <textarea id="review" name="review" required></textarea>

        <button type="submit">Submit</button>
      </form>
    `;
  }
}

customElements.define('add-review', AddReview);

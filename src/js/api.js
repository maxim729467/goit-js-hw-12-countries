export default class ApiService {
  constructor({ root, query, onResolved, onRejected }) {
    this.root = root;
    this.query = query;
    this.onResolved = onResolved;
    this.onRejected = onRejected;
  }

  fetch() {
    fetch(`${this.root}${this.query}`)
      .then(this.onFetch)
      .then((response) => {
        this.onResolved(response);
      })
      .catch((response) => {
        this.onRejected(response);
      });
  }

  onFetch(response) {
    if (response.ok) {
      return response.json();
    } else if (response.status === 404) {
      throw "Invalid entry. Please try again.";
    } else {
      throw "It seems there are some server issues.";
    }
  }
}

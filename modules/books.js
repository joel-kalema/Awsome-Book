export default class Bookstore {
  constructor() {
    this.books = [];
  }

  addBook = (author, title) => {
    const id = this.books.length + 1;
    const bookData = {
      id,
      author,
      title,
    };
    this.books.push(bookData);
  }

  removeBook = (id) => {
    this.books.forEach((book) => {
      if (book.id === id) {
        this.books.splice(this.books.indexOf(book), 1);
      }
    });
  }

  displayBooks = (list) => {
    list.innerHTML = '';
    this.books.forEach((book) => {
      const li = `<li><div class="list-container"><h3>"${book.title}"</h3>
                  <p>by ${book.author}</p></div>
                  <button id="${book.id}" class="remove-btn">Remove</button></li>`;
      list.innerHTML += li;
    });
  }

  setStorage = () => {
    const formData = JSON.stringify(this.books);
    localStorage.setItem('books', formData);
  };

  getStorage = (key) => {
    this.books = JSON.parse(localStorage.getItem(key));
    return this.books;
  };
}

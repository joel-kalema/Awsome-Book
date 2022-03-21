const author = document.querySelector('#author');
const title = document.querySelector('#title');
const addBookForm = document.querySelector('#add-book');
const list = document.querySelector('.list');
const time = document.querySelector('.time');

function formatAMPM(date) {
  let hours = date.getHours();

  let minutes = date.getMinutes();

  const ampm = hours >= 12 ? 'pm' : 'am';

  hours %= 12;

  hours = hours || 12;

  minutes = minutes < 10 ? `0${minutes}` : minutes;

  const time = `${hours}:${minutes} ${ampm}`;

  const match = date.toString().match(/\w{3} \w{3} \d{1,2} \d{4}/);

  return `${match[0]} ${time}`;
}
const today = new Date();
time.textContent = formatAMPM(today);

function SetupTabs() {
  document.querySelectorAll('.tab__button').forEach((button) => {
    button.addEventListener('click', () => {
      const sideBar = button.parentElement;
      const tabsContainer = sideBar.parentElement;
      const tabNumber = button.dataset.forTab;
      const tabToActivate = tabsContainer.querySelector(`.tab__content[data-tab ="${tabNumber}"]`);

      sideBar.querySelectorAll('.tab__button').forEach((button) => {
        button.classList.remove('tab__button--active');
      });

      tabsContainer.querySelectorAll('.tab__content').forEach((tab) => {
        tab.classList.remove('tab__content--active');
      });

      button.classList.add('tab__button--active');
      tabToActivate.classList.add('tab__content--active');
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  SetupTabs();
});

class Bookstore {
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

const bookStore = new Bookstore();

addBookForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (author.value.trim() !== '' && title.value.trim() !== '') {
    bookStore.addBook(author.value, title.value);
    bookStore.setStorage();
    bookStore.displayBooks(list);
    e.target.reset();
  }
});

document.addEventListener('click', (e) => {
  if (e.target && e.target.classList.contains('remove-btn')) {
    const id = parseFloat(e.target.id);
    bookStore.removeBook(id);
    bookStore.setStorage();
    bookStore.displayBooks(list);
  }
});

document.addEventListener('DOMContentLoaded', () => {
  if (bookStore.getStorage('books')) {
    bookStore.getStorage('books');
    bookStore.displayBooks(list);
  }
});
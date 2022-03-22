import Bookstore from './modules/books.js';
import SetupTabs from './modules/switch.js';

const author = document.querySelector('#author');
const title = document.querySelector('#title');
const addBookForm = document.querySelector('#add-book');
const list = document.querySelector('.list');
const time = document.querySelector('.time');

const timeNow = () => {
  const now = luxon.DateTime.now();
  time.innerHTML = now.toFormat('ccc HH:mm:ss');
};

setInterval(() => {
  timeNow();
}, 1000);

document.addEventListener('DOMContentLoaded', () => {
  SetupTabs();
});

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
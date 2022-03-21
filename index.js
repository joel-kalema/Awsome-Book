import Bookstore from './books.js';

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

const SetupTabs = () => {
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
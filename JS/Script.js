class Book {
  constructor() {
    this.bookCollection = document.querySelector('#collection');
    this.addBook = document.querySelector('#add-book');
    this.library = {};
  }

  storeEntryData = (titleElement, authorElement) => {
    const entryObject = {};
    entryObject.title = titleElement.value;
    entryObject.author = authorElement.value;
    this.library.push(entryObject);
  }

  appendBookHTML = (title = false, author = false) => {
    if (title === false || author === false) {
      return true;
    }
    const newBook = document.createElement('div');
    newBook.setAttribute('class', 'book-list');
    const newTitle = document.createElement('div');
    newTitle.innerHTML = title.concat('-by-');
    newBook.appendChild(newTitle);
    const newAouthor = document.createElement('div');
    newAouthor.innerHTML = author;
    newBook.appendChild(newAouthor);
    const removeButton = document.createElement('div');
    removeButton.innerHTML = '<button class="remove">Remove</button><br><br>';
    newBook.appendChild(removeButton);
    this.bookCollection.appendChild(newBook);
    return false;
  }

  loadBooks = () => {
    for (let i = 0; i < this.library.length; i += 1) {
      this.appendBookHTML(this.library[i].title, this.library[i].author);
    }
  }

  updateNewBook = () => {
    // eslint-disable-next-line max-len
    this.appendBookHTML(this.library[this.library.length - 1].title, this.library[this.library.length - 1].author);
    localStorage.setItem('Awesome Book Collection', JSON.stringify(this.library));
  }

  removeBook = (element) => {
    const parent = element.parentElement.parentElement;
    const parrentIndex = Array.from(this.bookCollection.children).indexOf(parent);
    parent.remove();
    this.library.splice(parrentIndex, 1);
    localStorage.setItem('Awesome Book Collection', JSON.stringify(this.library));
  }
}
// Program Staring Point
const BookObj = new Book();
if (localStorage.getItem('Awesome Book Collection') === null) {
  BookObj.library = [];
} else {
  BookObj.library = JSON.parse(localStorage.getItem('Awesome Book Collection'));
}

BookObj.loadBooks();

BookObj.addBook.addEventListener('click', (event) => {
  event.preventDefault();
  const getTitleElement = event.target.parentElement.querySelector('#title');
  const getAuthorElement = event.target.parentElement.querySelector('#author');
  if (event.target.id === 'add') {
    if (getTitleElement.value === '' || getAuthorElement.value === '') {
      event.preventDefault();
    } else {
      BookObj.storeEntryData(getTitleElement, getAuthorElement);
      BookObj.updateNewBook();
      getTitleElement.value = '';
      getAuthorElement.value = '';
    }
  }
});

BookObj.bookCollection.addEventListener('click', (event) => {
  if (event.target.classList.contains('remove')) {
    BookObj.removeBook(event.target);
  }
});

document.getElementById('add').addEventListener('click', () => {
  document.getElementById('add-book').style.display = 'block';
  document.getElementById('book-list').style.display = 'none';
  document.getElementById('contact').style.display = 'none';
});
document.getElementById('list').addEventListener('click', () => {
  document.getElementById('book-list').style.display = 'block';
  document.getElementById('add-book').style.display = 'none';
  document.getElementById('contact').style.display = 'none';
});
document.getElementById('contact-btn').addEventListener('click', () => {
  document.getElementById('contact').style.display = 'block';
  document.getElementById('book-list').style.display = 'none';
  document.getElementById('book-add').style.display = 'none';
});
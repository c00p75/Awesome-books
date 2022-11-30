const bookCollection = document.querySelector('#collection');
const addBook = document.querySelector('#add-book');
let library;
if (localStorage.getItem('Awesome Book Collection') === null) {
  library = [];
} else {
  library = JSON.parse(localStorage.getItem('Awesome Book Collection'));
}

function storeEntryData(titleElement, authorElement) {
  const entryObject = {};
  entryObject.title = titleElement.value;
  entryObject.author = authorElement.value;
  library.push(entryObject);
}

function appendBookHTML(title = false, author = false) {
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
  bookCollection.appendChild(newBook);
  return false;
}

function loadBooks() {
  for (let i = 0; i < library.length; i += 1) {
    appendBookHTML(library[i].title, library[i].author);
  }
}

loadBooks();

function updateNewBook() {
  appendBookHTML(library[library.length - 1].title, library[library.length - 1].author);
  localStorage.setItem('Awesome Book Collection', JSON.stringify(library));
}

function removeBook(element) {
  const parent = element.parentElement.parentElement;
  const parrentIndex = Array.from(bookCollection.children).indexOf(parent);
  parent.remove();
  library.splice(parrentIndex, 1);
  localStorage.setItem('Awesome Book Collection', JSON.stringify(library));
}

addBook.addEventListener('click', (event) => {
  event.preventDefault();
  const getTitleElement = event.target.parentElement.querySelector('#title');
  const getAuthorElement = event.target.parentElement.querySelector('#author');
  if (event.target.id === 'add') {
    if (getTitleElement.value === '' || getAuthorElement.value === '') {
      event.preventDefault();
    } else {
      storeEntryData(getTitleElement, getAuthorElement);
      updateNewBook();
      getTitleElement.value = '';
      getAuthorElement.value = '';
    }
  }
});

bookCollection.addEventListener('click', (event) => {
  if (event.target.classList.contains('remove')) {
    removeBook(event.target);
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
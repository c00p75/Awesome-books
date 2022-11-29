const bookCollection = document.querySelector('#collection');
const addBook = document.querySelector('#add-book');

if (localStorage.getItem('Awesome Book Collection') === null) {
  var library = [];
} else {
  var library = JSON.parse(localStorage.getItem('Awesome Book Collection'))
}

function storeEntryData(titleElement, authorElement) {
  let entryObject = {};
  entryObject.title = titleElement.value;
  entryObject.author = authorElement.value;
  library.push(entryObject);
}

function appendBookHTML(title = false, author = false) {  
  if (title === false || author === false) { return }
  let newBook = document.createElement('div');
  let newTitle = document.createElement('div');
  newTitle.innerHTML = title;
  newBook.appendChild(newTitle);
  let newAouthor = document.createElement('div');
  newAouthor.innerHTML = author;
  newBook.appendChild(newAouthor);
  let removeButton = document.createElement('div');
  removeButton.innerHTML = '<button class="remove">Remove</button><br><br>';
  newBook.appendChild(removeButton);
  bookCollection.appendChild(newBook);
} 

function loadBooks() {
  for (let i = 0; i < library.length; i++) {    
    appendBookHTML(library[i].title, library[i].author)
  }
}

loadBooks();

function updateNewBook() {
  appendBookHTML(library[library.length-1].title, library[library.length-1].author);
  localStorage.setItem('Awesome Book Collection', JSON.stringify(library));
}

function removeBook(element) {
  let parent = element.parentElement.parentElement;
  let parrentIndex = Array.from(bookCollection.children).indexOf(parent);
  parent.remove();
  library.splice(parrentIndex,1)
  localStorage.setItem('Awesome Book Collection', JSON.stringify(library));
}

addBook.addEventListener('click', (event) => {
  event.preventDefault();
  let getTitleElement = event.target.parentElement.querySelector('#title');
  let getAuthorElement = event.target.parentElement.querySelector('#author');
  if (event.target.id === 'add') {
    if (getTitleElement.value === '' || getAuthorElement.value === '') {
      event.preventDefault();
    } else {      
      storeEntryData(getTitleElement, getAuthorElement);
      updateNewBook()      
      getTitleElement.value = '';
      getAuthorElement.value = '';
    }
  }
})

bookCollection.addEventListener('click', (event) => {
  if (event.target.classList.contains('remove')) {
    removeBook(event.target)
  } 
})

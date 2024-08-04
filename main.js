const myLibrary = [];

function Book(title, author, genre, hasRead) {
  this.title = title;
  this.author = author;
  this.genre = genre;
  this.hasRead = hasRead;
  this.info = function () {
    return {
      titleAuthor: `${this.title} by ${this.author}`,
      genre: this.genre,
      readStatus: this.hasRead ? "Read" : "Not yet read",
    };
  };
}

function addBookToLibrary(title, author, genre, hasRead) {
  const book = new Book(title, author, genre, hasRead);
  myLibrary.push(book);
}

// method to toggle the read status on the Book prototype
Book.prototype.toggleRead = function () {
  this.hasRead = !this.hasRead;
};

function displayBooks() {
  const shelf = document.querySelector(".shelf");
  shelf.innerHTML = "";

  for (let i = 0; i < myLibrary.length; i++) {
    const book = myLibrary[i];
    const bookInfo = book.info();

    const newBookCard = document.createElement("div");
    newBookCard.classList.add("book-card");
    newBookCard.dataset.index = i; // Add data attribute for index

    const titleAuthor = document.createElement("p");
    titleAuthor.classList.add("title-author");
    titleAuthor.textContent = bookInfo.titleAuthor;

    const genre = document.createElement("p");
    genre.classList.add("genre");
    genre.textContent = bookInfo.genre;

    const readStatus = document.createElement("p");
    readStatus.classList.add("read-status");
    readStatus.textContent = bookInfo.readStatus;

    // Create remove button
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.classList.add("remove-btn");
    removeBtn.addEventListener("click", removeBook);

    // Create toggle read status button
    const toggleReadBtn = document.createElement("button");
    toggleReadBtn.textContent = "Toggle Read";
    toggleReadBtn.classList.add("toggle-read-btn");
    toggleReadBtn.addEventListener("click", toggleReadStatus);

    newBookCard.appendChild(titleAuthor);
    newBookCard.appendChild(genre);
    newBookCard.appendChild(readStatus);
    newBookCard.appendChild(removeBtn);
    newBookCard.appendChild(toggleReadBtn);

    shelf.appendChild(newBookCard);
  }
}

// Get references to the dialog and button elements
const dialog = document.getElementById("add-book-dialog");
const newBookBtn = document.getElementById("new-book-btn");
const closeDialogBtn = document.getElementById("close-dialog");
const addBookForm = document.getElementById("add-book-form");

// Show the dialog when the "New Book" button is clicked
newBookBtn.addEventListener("click", () => {
  dialog.showModal();
});

// Close the dialog when the "Cancel" button is clicked
closeDialogBtn.addEventListener("click", () => {
  dialog.close();
});

// Handle the form submission
addBookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.getElementById("book_title").value;
  const author = document.getElementById("author_name").value;
  const genre = document.getElementById("book_genre").options[document.getElementById("book_genre").selectedIndex].text;
  const hasRead = document.querySelector('input[name="has_read"]:checked').value === "yes";

  addBookToLibrary(title, author, genre, hasRead);
  displayBooks();
  dialog.close();
  addBookForm.reset();
});

function removeBook(event) {
  const bookCard = event.target.closest(".book-card");
  const index = bookCard.dataset.index;
  myLibrary.splice(index, 1);
  displayBooks();
}

function toggleReadStatus(event) {
  const bookCard = event.target.closest(".book-card");
  const index = bookCard.dataset.index;
  myLibrary[index].toggleRead();
  displayBooks();
}

let myLibrary = [];
const bookTable = document.querySelector("#book-table");
const addBookButton = document.querySelector("#add-book");
const formModal = document.querySelector("#form-modal");

const bookForm = document.querySelector("#new-book-form");
const cancelBtn = bookForm.querySelector("#book-form-cancel-btn");

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

Book.prototype.info = function () {
  return `${this.title}, ${this.author}, ${this.pages} pages, ${
    this.isRead ? "read" : "not read yet"
  }`;
};

Book.prototype.toggleIsRead = function () {
  this.isRead = !this.isRead;
};

function addBookToLibrary(book) {
  myLibrary.push(book);
  updateBookList();
}

function removeBookFromLibrary(bookIndex) {
  myLibrary.splice(bookIndex, 1);
  updateBookList();
}

function updateBookList() {
  bookTable.innerHTML =
    "<tr><th>Title</th><th>Author</th><th>Number of pages</th><th>Read</th></tr>";
  myLibrary.forEach((book, index) => {
    const tr = document.createElement("tr");

    const tdTitle = document.createElement("td");
    const tdAuthor = document.createElement("td");
    const tdPages = document.createElement("td");
    const tdIsRead = document.createElement("td");
    const tdToggleReadBtn = document.createElement("td");
    const tdRemoveBtn = document.createElement("td");

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.addEventListener("click", () => {
      removeBookFromLibrary(index);
    });

    const toggleReadBtn = document.createElement("button");
    toggleReadBtn.textContent = `Change to ${
      book.isRead ? "not read" : "read"
    }`;
    toggleReadBtn.addEventListener("click", () => {
      book.toggleIsRead();
      toggleReadBtn.textContent = `Change to ${
        book.isRead ? "not read" : "read"
      }`;
      tdIsRead.textContent = !!book.isRead;
    });

    tdTitle.textContent = book.title;
    tdAuthor.textContent = book.author;
    tdPages.textContent = book.pages;
    tdIsRead.textContent = !!book.isRead;
    tdToggleReadBtn.append(toggleReadBtn);
    tdRemoveBtn.append(removeBtn);

    tr.append(tdTitle);
    tr.append(tdAuthor);
    tr.append(tdPages);
    tr.append(tdIsRead);
    tr.append(tdToggleReadBtn);
    tr.append(tdRemoveBtn);
    bookTable.append(tr);
  });
}

function bookFormSubmitHandler(e) {
  e.preventDefault();
  const bookTitle = bookForm.querySelector("#book-title-input").value;
  const bookAuthor = bookForm.querySelector("#book-author-input").value;
  const bookPages = bookForm.querySelector("#book-pages-input").value;
  const bookIsRead = bookForm.querySelector("#book-isRead-input").checked;

  addBookToLibrary(new Book(bookTitle, bookAuthor, bookPages, bookIsRead));
  bookForm.reset();
  cancelBtn.click();
}

addBookButton.addEventListener("click", () => {
  formModal.classList.remove("d-none");
  bookForm.addEventListener("submit", bookFormSubmitHandler);
});
cancelBtn.addEventListener("click", () => {
  formModal.classList.add("d-none");
  bookForm.removeEventListener("submit", bookFormSubmitHandler);
});

myLibrary.push(new Book("Atomic Habits", "James Clear", 320, false));
myLibrary.push(
  new Book("The Subtle Art of Not Giving a F*ck", "Mark Manson", 224, false)
);
myLibrary.push(new Book("Can't Hurt Me", "David Goggins", 364, false));
myLibrary.push(new Book("The 48 Laws of Power", "Robert Greene", 452, false));
updateBookList();

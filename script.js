const form = document.querySelector(".input-field");
const addButton = document.querySelector(".add-book-btn");
const bookName = document.querySelector("#name");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const bookCard = document.querySelectorAll(".book-card");
const radioField = document.querySelector(".radio-field");
const radioButton = document.querySelector(".name");
const buttonContainer = document.querySelector(".button-container");
const bookCardContainer = document.querySelector(".book-card-container");
let removeBtn = document.querySelectorAll('.remove-btn');
let bookCards;

console.log(removeBtn);

let myLibrary = [];

function Book(name, author, pages, read, id) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = id;
}

const showBookCard = function () {

    bookCards = document.querySelectorAll(".book-card");
    console.log(bookCards);
    bookCards.forEach((item) => bookCardContainer.removeChild(item));

    myLibrary.forEach((item) => {
        console.log('myLibrary');

        const book = document.createElement("div");
        book.classList.add("book-card");

        book.setAttribute('data-index-number', item.id);


        const infoContainer = document.createElement("div");
        infoContainer.classList.add("info-container");

        const bookName = document.createElement("h3");
        bookName.classList.add("book-name");
        bookName.textContent = item.name;
        infoContainer.appendChild(bookName);

        const authorName = document.createElement("h3");
        authorName.classList.add("writer-name");
        authorName.textContent = item.author;
        infoContainer.appendChild(authorName);

        const pages = document.createElement("h4");
        pages.classList.add("book-page");
        pages.textContent = item.pages;
        infoContainer.appendChild(pages);

        const readText = document.createElement("h4");
        readText.classList.add("read-or-unread");
        readText.textContent = item.read;
        infoContainer.appendChild(readText);


        const buttonContainer = document.createElement("div");
        buttonContainer.classList.add("button-container");

        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.classList.add("remove-btn");
        removeButton.setAttribute("id", item.id);
        removeButton.addEventListener('click', (e) => {
            const newLibrary = myLibrary.filter((item) => item.id != e.target.id);
            myLibrary = newLibrary.slice();
            showBookCard();
        })

        const markButton = document.createElement("button");
        markButton.textContent = "Mark as Unread";
        markButton.classList.add("mark-btn");
        markButton.setAttribute('data-index-number', item.id);
        markButton.addEventListener('click', (e) => {
            bookCards = document.querySelectorAll('.book-card');
            if (markButton.textContent === 'Mark as Unread') {
                markButton.textContent = 'Mark as Read';
            }
            else {
                markButton.textContent = 'Mark as Unread';
            }
            bookCards.forEach(item => {

                if (markButton.dataset.indexNumber === item.dataset.indexNumber) {
                    if (item.childNodes[0].childNodes[3].textContent === 'Read') {
                        item.childNodes[0].childNodes[3].textContent = 'Not Read';
                    }
                    else {
                        item.childNodes[0].childNodes[3].textContent = 'Read';
                    }
                }
            })

            myLibrary.forEach(item => {
                if (markButton.dataset.indexNumber === item.id) {
                    if (item.read === "Read") {
                        item.read = "Not Read";
                    }
                    else {
                        item.read = "Read";
                    }
                }
            })

        })

        buttonContainer.appendChild(removeButton);
        buttonContainer.appendChild(markButton);

        book.appendChild(infoContainer);

        book.appendChild(buttonContainer);

        bookCardContainer.appendChild(book);

    })

}

addButton.addEventListener('click', (e) => {
    console.log(form);
    console.log(bookName.value);
    console.log(form.radio.value);

    const uniqueId = crypto.randomUUID();

    const book = new Book(bookName.value, author.value, pages.value + " pages", ((form.radio.value === "read") ? "Read" : "Not Read"), uniqueId);
    myLibrary.push(book);
    console.log(myLibrary);
    showBookCard();
})

form.addEventListener('submit', (event) => {
    event.preventDefault();
})

const uniqueId = crypto.randomUUID();

const book = new Book("Hamlet", "Shakespeare", "290 pages", "Read", uniqueId);
myLibrary.push(book);

showBookCard();
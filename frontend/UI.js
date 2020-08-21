import BookService from './services/BookService';
const bookService = new BookService();

import { format } from 'timeago.js';

class UI {

  async renderBooks() {
    const books = await bookService.getBooks();
    console.log(books)
    const booksCardContainer = document.getElementById('books-cards');
    booksCardContainer.innerHTML = '';
    books.forEach((book) => {
      const div = document.createElement('div');
      const divi = document.createElement('menu');
      const divis = document.createElement('table');
      div.className = 'animated fadeInRight';
      div.innerHTML = `
      <div class="card m-4">
        <div class="row no-gutters">

            <div class="col-md-4">
                <img src="http://localhost:3000${book.imagePath}" class="img-fluid" alt="">
            </div>
            <div class="col-md-8">
                <div class="card-block px-4">
                    <h4 class="card-title">${book.title}</h4>
                    <p class="card-text">${book.author}</p>
                    <a href="#" class="btn btn-danger delete" _id="${book._id}">XXXX</a>
                </div>
            </div>
        </div>
        <div class="card-footer w-100 text-muted">
          ${format(book.created_at)}
        </div>
      </div>
      `;
      booksCardContainer.appendChild(div);
      booksCardContainer.appendChild(divi);
      booksCardContainer.appendChild(divis);
    });
  }

  async addANewBook(book) {
    await bookService.postBook(book);
    this.renderBooks();
    this.clearBookForm();
  }

  clearBookForm() {
    document.getElementById('book-form').reset();
    document.getElementById('title').focus();
  }

  renderMessage(message, colorMessage, secondsToRemove) {
    // Creating a div
    const div = document.createElement('div');
    // Styling the div
    //div.className = `alert alert${colorMessage}`;
    div.className = `message ${colorMessage}`;
    // Adding Text to the div
    div.appendChild(document.createTextNode(message));
    // Puting in the documnet
    const container = document.querySelector('.col-md-4');
    const bookForm = document.querySelector('#book-form');
    container.insertBefore(div, bookForm);
    // Removing the div after some secconds
    setTimeout(() => {
      document.querySelector('.message').remove();
    }, secondsToRemove);
  }

  async deleteBook(bookId) {
    await bookService.deleteBook(bookId);
    this.renderBooks();
  }

}

export default UI;

const fs = require('fs');
const chalk = require('chalk');

const dataPath = 'bookshelf.json';

const loadBooks = () => {
    try {
        const data = fs.readFileSync(dataPath);
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
};

const saveBooks = (books) => {
    fs.writeFileSync(dataPath, JSON.stringify(books, null, 2));
};

const addBook = (title, author) => {
    const books = loadBooks();
    books.push({ title, author });
    saveBooks(books);
    console.log(chalk.yellow('Book added successfully!'));
};

const listBooks = () => {
    const books = loadBooks();
    if (books.length === 0) {
        console.log('No books found!');
    } else {
        console.log(chalk.green('Your Bookshelf:'));
        books.forEach((book, index) => {
            console.log(`${index + 1}. ${book.title} by ${book.author}`);
        });
    }
};

const searchBooks = (query) => {
    const books = loadBooks();
    const matchedBooks = books.filter((book) =>
        book.title.toLowerCase().includes(query.toLowerCase()) ||
        book.author.toLowerCase().includes(query.toLowerCase())
    );
    if (matchedBooks.length === 0) {
        console.log('No matching books found!');
    } else {
        console.log(chalk.blue('Matching Books:'));
        matchedBooks.forEach((book, index) => {
            console.log(`${index + 1}. ${book.title} by ${book.author}`);
        });
    }
};

const removeBook = (index) => {
    const books = loadBooks();
    if (index >= 1 && index <= books.length) {
        books.splice(index - 1, 1);
        saveBooks(books);
        console.log(chalk.red('Book removed successfully!'));
    } else {
        console.log('Book not found!');
    }
};

module.exports = {
    addBook,
    listBooks,
    searchBooks,
    removeBook
};
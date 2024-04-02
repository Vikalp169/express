const yargs = require('yargs');
const chalk = require('chalk');
const { addBook, listBooks, searchBooks, removeBook } = require('./book.js');

// Command to add a new book
yargs.command({
    command: 'add',
    describe: 'Add a new book to the bookshelf',
    builder: {
        title: {
            describe: 'Title of the book',
            demandOption: true,
            type: 'string'
        },
        author: {
            describe: 'Author of the book',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        addBook(argv.title, argv.author);
    }
});

// Command to list all books on the bookshelf
yargs.command({
    command: 'list',
    describe: 'List all books on the bookshelf',
    handler: () => {
        listBooks();
    }
});

// Command to search for books by title or author
yargs.command({
    command: 'search <query>',
    describe: 'Search for books by title or author',
    handler: (argv) => {
        searchBooks(argv.query);
    }
});

// Command to remove a book from the bookshelf
yargs.command({
    command: 'remove <index>',
    describe: 'Remove a book from the bookshelf',
    handler: (argv) => {
        removeBook(argv.index);
    }
});

yargs.parse();



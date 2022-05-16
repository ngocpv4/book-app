import React from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../BooksAPI';
import BookShelfChanger from './bookshelfchanger';

class SearchBook extends React.Component {
    state = {
        books: [],
        query: ''
    }

    handleInputChange = (event) => {
        const { value } = event.target;
        this.setState(() => ({
            query: value
        }))
        this.searchBook(value);
    }

    searchBook = (query) => {
        BooksAPI.search(query)
            .then((bookRes) => {
                if(bookRes && !bookRes.error) {
                    this.props.books.forEach((book) => {
                        const find = bookRes.find((b) => b.id === book.id);
                        if(find) {
                            find.shelf = book.shelf
                        }
                    })

                    this.setState(() => ({
                        books: bookRes
                    }))
                } else {
                    this.setState(() => ({
                        books: []
                    }))
                }
            }).catch((error) => {
            
            })
    }

    render() {
        const { query, books } = this.state;
        const { updateBookShelf } = this.props;

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to='/'>Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text"
                            placeholder="Search by title or author"
                            value={query} onChange={this.handleInputChange} />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {
                            !books.error && books.map((book, index) => (
                                <li key={index}>
                                    <div className="book">
                                        <div className="book-top">
                                            <div className="book-cover" style={{ width: 128, height: 193, 
                                                backgroundImage: `url(${ book.imageLinks ? book.imageLinks.thumbnail : '' })` }}></div>
                                            <BookShelfChanger
                                                shelf={book.shelf}
                                                book={book}
                                                updateBookShelf={updateBookShelf} />
                                        </div>
                                        <div className="book-title">{book.title}</div>
                                        <div className="book-authors">{book.authors && book.authors.join(', ')}</div>
                                    </div>
                                </li>
                            ))
                        }
                    </ol>
                </div>
            </div>
        )
    }
}

export default SearchBook;
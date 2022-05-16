import React from 'react';
import BookShelfChanger from './bookshelfchanger';

class BookItem extends React.Component {
    render() {
        const { books, bookshelfTitle, updateBookShelf } = this.props;
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{bookshelfTitle}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {
                            !books.error && books.map((book, index) => (
                                <li key={index}>
                                    <div className="book">
                                        <div className="book-top">
                                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
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

export default BookItem;
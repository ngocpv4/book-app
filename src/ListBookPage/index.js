import React from 'react';
import { Link } from 'react-router-dom';
import * as constant from '../constant';
import BookItem from './bookitem';

class ListBook extends React.Component {
    render() {
        const { books, updateBookShelf } = this.props;
        const bookReads = books.filter((book) => book.shelf === constant.READ);
        const bookWantToReads = books.filter((book) => book.shelf === constant.WANT_TO_READ);
        const bookCurrentReads = books.filter((book) => book.shelf === constant.CURRENTLY_READING);

        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <BookItem
                            key={constant.CURRENTLY_READING}
                            books={bookCurrentReads} 
                            bookshelfTitle="Currently Reading" 
                            updateBookShelf={updateBookShelf} />
                        <BookItem 
                            key={constant.WANT_TO_READ}
                            books={bookWantToReads} 
                            bookshelfTitle="Want to Read" 
                            updateBookShelf={updateBookShelf} />
                        <BookItem 
                            key={constant.READ}
                            books={bookReads} 
                            bookshelfTitle="Read" 
                            updateBookShelf={updateBookShelf} />
                    </div>
                </div>
                <div className="open-search">
                    <Link to='/search'>Add a book</Link>
                </div>
            </div>
        )
    }
}

export default ListBook;
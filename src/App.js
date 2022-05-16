import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBook from './ListBookPage/index.js';
import SearchBook from './ListBookPage/seachbook.js';
import { Route } from 'react-router-dom';

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    this.getAllBook();
  }

  getAllBook = () => {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          books
        }))
      }) 
  }

  updateBookShelf = (book, shelf) => {
    if(book.shelf !== shelf) {
      book.shelf = shelf;
      BooksAPI.update(book, shelf)
      .then((data) => {
        this.setState((currState) => ({
          books: [
            ...currState.books,
            book
          ]
        }))
      })
    }
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/'
          render={() => (<ListBook books={this.state.books} updateBookShelf={this.updateBookShelf} />)}>
        </Route>
        <Route path='/search'
          render={() => (<SearchBook updateBookShelf={this.updateBookShelf} books={this.state.books} />)}>
        </Route>
      </div>
    )
  }
}

export default BooksApp

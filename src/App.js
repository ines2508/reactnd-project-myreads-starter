import React, {Component} from 'react'
import * as BooksAPI from './BooksAPI'

import './App.css'

/* COMPONENTS */

import Search from './Search'
import MyReads from './MyReads'
import shelfValue from './ListShelfs';

class BooksApp extends Component {

  state={
    books: [],
    searchList: [],
    shelfs: shelfValue,
    currentShelf: "",
    value: "",
    showSearchPage: false,
    showResult: false,
  }

// Change page

  changePage = (page) => {
    this.setState({showSearchPage: page})
  }

// Get all books from the server to check existing shelfs

  componentDidMount() {
    BooksAPI.getAll().then((books) => this.setState ( {
        books
    })).catch( (err) => ( console.log("Didn't get all books " + err)))
  }

  // Move book to new shelf

  moveBook = (book, shelf) => {
   
    BooksAPI.update(book, shelf)
        .then(response => {
          BooksAPI.getAll()
          .then((books) => {this.setState({books})})
        })
        .catch( (err) => (
          console.log("Was unable to move the book " + err)
        ))

  console.log(`New shelf ${shelf} + old shelf ${book.shelf}`)    

  }
  
// Search book

  searchBook = (query, empty) => {
    console.log(empty)
    BooksAPI.search(query) 
      .then((searchList) => {      
        this.setState({searchList})    
      })
      .then(
        (empty > 0) ?
        (() => {this.setState({showResult: true})}) : (
          () => {this.setState({showResult: false})}
        ))
      .catch( (err) => ( console.log("Didn't find the book " + err)))     
  }

  render() {
    return (
        <div className="app">
        {this.state.showSearchPage ?
          <Search   changePage={this.changePage}
                    searchBook={this.searchBook}
                    moveBook={this.moveBook}
                    showResult={this.state.showResult}
                    books={this.state.books}
                    searchList={this.state.searchList}
                    shelfs={this.state.shelfs}
                    value={this.state.value}
                    currentShelf={this.state.currentShelf}
          /> 
          : <MyReads  changePage={this.changePage} 
                      moveBook={this.moveBook}
                      books={this.state.books}
                      shelfs={this.state.shelfs}
                      value={this.state.value}
            />
        }
        </div>

      
    )
  }
}

export default BooksApp

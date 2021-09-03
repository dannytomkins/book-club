import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import SearchBooks from '../book-forms/SearchBooks';
import BookItem from './BookItem';
import { getBooksByTitle } from '../../actions/book';

// check what the parameter 'results' should be called
const Books = ({ getBooksByTitle, book: {books, loading} }) => {
  const [term, setTerm] = useState('')
  // const [books, setBooks] = useState([])
  
  // useEffect(() => {
  //   getBooksByTitle()
  // }, [])

  const onChange = e => {
    const {value} = e.target
    setTerm(value)
  }
    
  const onSubmit = (e) => {
    e.preventDefault()
    getBooksByTitle(term)
    // .then(books => {
      console.log('term', term, books)
    //   setBooks(books)
    // })
  }

  return null ? (
        <Spinner />
      ) : (
        <Fragment>
            <div>BOOKS - under construction</div>
            <SearchBooks term={term} onChange={onChange} onSubmit={onSubmit}/>
            <div className='posts'>
              {books.length > 0 ? books.map((book) => (
            <BookItem key={book.id} book={book}/>
            )) : "No books found"}
            </div>
        </Fragment>
      );
}

Books.propTypes = {
  getBooksByTitle: PropTypes.func.isRequired,
  book: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  book: state.book
})

export default connect(mapStateToProps, { getBooksByTitle })(Books)

import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import SearchBooks from '../book-forms/SearchBooks';
import BookItem from './BookItem';
import { getBooksByTitle } from '../../actions/book';

const Books = ({ getBooksByTitle, book: { books, loading }}) => {
  useEffect(() => {
    getBooksByTitle()
  }, [])
    return loading ? (
        <Spinner />
      ) : (
        <Fragment>
            <div>BOOKS - under construction</div>
            <SearchBooks />
            <div className='posts'>
              {books.map((book) => (
            <BookItem key={book.id} book={book}/>
            ))}
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

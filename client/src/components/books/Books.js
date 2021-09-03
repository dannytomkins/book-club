import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import SearchBooks from '../book-forms/SearchBooks';
import BookItem from './BookItem';
import { getBooksByTitle } from '../../actions/book';


const Books = (  ) => {
  useEffect(() => {
    getBooksByTitle()
  }, [])
    return null ? (
        <Spinner />
      ) : (
        <Fragment>
            <div>BOOKS - under construction</div>
            <SearchBooks />
            <BookItem key={book.id} book={book}/>
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

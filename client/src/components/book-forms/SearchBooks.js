import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const SearchBooks = ({ onSubmit, onChange, term }) => {
  return (
    <Fragment>
      <h1 className='large text-primary'>Books</h1>
      <p className='lead'>
        <i className='fas fa-book'></i> Search and Browse Books
      </p>
      <form className='form' onSubmit={onSubmit}>
        <div className='input-group mb-3'>
          <input
            type='text'
            className='form-control'
            placeholder='Search by title'
            aria-label='Title'
            aria-describedby='basic-addon2'
            value={term}
            onChange={(e) => onChange(e)}
          />
          <div className='input-group-btn'>
            <button type='submit' className='btn btn-primary'>
            <i className='fas fa-search'></i> Search
            </button>
          </div>
        </div>
      </form>
    </Fragment>
  );
};

SearchBooks.propTypes = {};

export default SearchBooks;

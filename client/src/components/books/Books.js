import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import SearchBooks from '../book-forms/SearchBooks';


const Books = (  ) => {
    return null ? (
        <Spinner />
      ) : (
        <Fragment>
            <div>BOOKS - under construction</div>
            <SearchBooks />
        </Fragment>
      );
}

Books.propTypes = {

}

export default connect()(Books)

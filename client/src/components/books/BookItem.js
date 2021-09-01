import React, { Fragment } from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';

const BookItem = ({auth, showActions}) => {
    return (
        <div class='post bg-white p-1 my-1'>
          <div>
            <Link to={`/profile/${null}`}>
              <img class='round-img' src={null} alt='' />
              <h4>{null}</h4>
            </Link>
          </div>
          <div>
            <p class='my-1'>{null}</p>
            {/* if showActions is true then show Fragment */}
            {showActions && (
              <Fragment>
                <button class='btn btn-primary'>
                  {null > 0 && (
                    <span class='comment-count'>{null}</span>
                  )}
                </button>
                  <button
                    onClick={null}
                    type='button'
                    class='btn btn-danger'
                  >
                    <i class='fas fa-times'></i>
                  </button>
              </Fragment>
            )}
          </div>
        </div>
      );
}

BookItem.defaultProps = {
    showActions: true,
  };

BookItem.propTypes = {
    auth: PropTypes.object.isRequired,
}

// Bring in auth state to see who's who, so the delete button only appears for user the post belongs to.
const mapStateToProps = (state) => ({
    auth: state.auth,
  });

export default BookItem

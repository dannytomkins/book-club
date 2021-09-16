import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addFavorite } from '../../actions/profile';

// @TODO: shorten book descriptions, error using substring
// @TODO: visually change button if item is already a favorite
const BookItem = ({
  addFavorite,
  auth,
  book: {
    id,
    volumeInfo: { imageLinks, title, authors, description },
  },
  showActions,
}) => {
  const handleAddFavorite = book => {
    const favorite = {
        googleId: id,
        title: title,
        authors: authors,
        description: description,
        image: imageLinks.thumbnail,
        thumbnail: imageLinks.smallThumbnail
    }
    addFavorite(favorite)
    // .then(results =>{
    //     console.log(results)
    // })
  }
  return (
    <div class='post bg-white p-1 my-1'>
      <div>
        {/* <Link to={`/profile/${null}`}> */}
        <img
          src={
            imageLinks ? imageLinks.thumbnail : 'http://placehold.it/300x300/'
          }
          alt=''
        />
        <h4>{title}</h4>
        <h6>{authors}</h6>
        {/* </Link> */}
      </div>
      <div>
        <p className='my-1'>{description}</p>
        {/* if showActions is true then show Fragment */}
        {auth.user && (showActions = true)}
        {showActions && (
          <Fragment>
                <button
                  onClick={(favorite) => handleAddFavorite(favorite)}
                  type='button'
                  class='btn btn-primary'
                >
                  <i class='far fa-star' />
                  {' Add to Favorites'}
                </button>
                {/* <button
                  onClick={null}
                  type='button'
                  class='btn btn-primary'
                >
                  <i class='far fa-bookmark' />
                  {' Add to Reading List'}
                </button> */}
          </Fragment>
        )}
      </div>
    </div>
  );
};

BookItem.defaultProps = {
  showActions: false,
};

BookItem.propTypes = {
  book: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addFavorite: PropTypes.func.isRequired,
};

// Bring in auth state to see who's who, so the delete button only appears for user the post belongs to.
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addFavorite })(BookItem);

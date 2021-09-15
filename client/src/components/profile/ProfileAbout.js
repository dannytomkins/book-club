// racfp
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

// @TODO: change css class from skills to favorites
const ProfileAbout = ({
  profile: {
    bio,
    favorites,
    user: { name },
  },
}) => {
  return (
    <div class='profile-about bg-light p-2'>
      {bio && (
        <Fragment>
          <h2 class='text-primary'>About Me</h2>
          <p>{bio}</p>
          <div class='line'></div>
        </Fragment>
      )}

      <h2 class='text-primary'>Favorites</h2>
      <div class='skills'>
        {favorites.slice(0, 19).map((book, _id) => (
          <div key={_id} className='p-1'>
            <img
              style={{ height: '30px', width: 'auto' }}
              src={
                book.thumbnail ? (
                  book.thumbnail
                ) : (
                  <i className='fas fa-bookmark' />
                )
              }
              alt=''
            />{' '}
            {' '+book.title}
          </div>
        ))}
      </div>
    </div>
  );
};

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileAbout;

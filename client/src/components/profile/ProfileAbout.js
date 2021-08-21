// racfp
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

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
        {favorites.slice(0,19).map((favorite, index) => (
            <div key={index} className="p-1">
                <i className="fas fa-bookmark" /> {favorite}
            </div>
        ))}
    </div>
  </div>
    )
    }

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileAbout;

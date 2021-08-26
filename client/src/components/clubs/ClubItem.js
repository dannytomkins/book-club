import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deleteClub } from '../../actions/club';

const ClubItem = ({
  deleteClub,
  auth,
  club: { _id, name, description, creator, members, admins, founded },
  showActions
}) => {
  return (
    <div class='post bg-white p-1 my-1'>
      <div>
        <a href='profile.html'>
          <img class='round-img' src='http://placehold.it/300x300/' alt='' />
          <h4>{name}</h4>
        </a>
      </div>
      <div>
        <p class='my-1'>{description}</p>
        <p class='post-date'>
          Founded on <Moment format='YYYY/MM/DD'>{founded}</Moment>
        </p>
        <i class='fas fa-users' /> <span>{members.length}</span>
        {' members'}
        {/* if showActions is true then show Fragment */}
        {showActions && (
          <Fragment>
            <Link to={`/clubs/${_id}`} class='btn btn-primary'>
              Visit
            </Link>
            {/* if not loading and the club creator is the same as logged in user then show button */}
            {!auth.loading && creator.user === auth.user._id && (
              <Fragment>
                <Link to={`/edit-club/${_id}`} type='button' class='btn btn-primary'>
                  <i class='fas fa-times' />
                  {' Edit Clib'}
                </Link>
                <button
                  onClick={(e) => deleteClub(_id)}
                  type='button'
                  class='btn btn-danger'
                >
                  <i class='fas fa-times' />
                  {' Delete Club'}
                </button>
              </Fragment>
            )}
          </Fragment>
        )}
      </div>
    </div>
  );
};

ClubItem.defaultProps = {
  showActions: true,
};

ClubItem.propTypes = {
  club: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteClub: PropTypes.func.isRequired,
};

// Bring in auth state to see who's who, so the creator functionality can only be seen by creator user
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteClub })(ClubItem);

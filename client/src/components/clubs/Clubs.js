import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ClubItem from './ClubItem';
import { getClubs } from '../../actions/club';

const Clubs = ({ getClubs, club: { clubs, loading } }) => {
  useEffect(() => {
    getClubs();
  }, [getClubs]);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Clubs</h1>
      <p className='lead'>
        <i className='fas fa-users'> Welcome to the community!</i>
      </p>
      {/* create a club button? Change className?*/}
      <div className='posts'>
        {clubs.map((club) => (
          <ClubItem key={club.id} club={club} />
        ))}
      </div>
    </Fragment>
  );
};

Clubs.propTypes = {
  getClubs: PropTypes.func.isRequired,
  club: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  club: state.club,
});

export default connect(mapStateToProps, { getClubs })(Clubs);

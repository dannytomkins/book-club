import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ClubItem from '../clubs/ClubItem';
import { getClub } from '../../actions/club';

// bring in match to get the id from the URL
const Club = ({ getClub, club: { club, loading }, match }) => {
  useEffect(() => {
    getClub(match.params.id);
  }, [getClub]);

  return loading || club === null ? (
    <Spinner />
  ) : (
    <Fragment>
        <Link to='/clubs' className='btn'>
            Back To Clubs
        </Link>
      <ClubItem club={club} showActions={true}/>
    </Fragment>
  );
};

Club.propTypes = {
  getClub: PropTypes.func.isRequired,
  club: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  club: state.club,
});

export default connect(mapStateToProps, { getClub })(Club);
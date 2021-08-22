import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getClubs } from '../../actions/club';

const Clubs = ({ getClubs, club: { clubs, loading } }) => {
    useEffect(() => {
        getClubs();
      }, [getClubs]);

    return (
        <div>
            CLUBS
        </div>
    )
}

Clubs.propTypes = {
    getClubs: PropTypes.func.isRequired,
    club: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    club: state.club
})

export default connect(mapStateToProps, { getClubs })(Clubs)

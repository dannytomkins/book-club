// fetch all data using an action, bring it in from redux state, pass to other components
import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner'
import { getCurrentProfile } from '../../actions/profile';
import PrivateRoute from '../routing/PrivateRoute';

const Dashboard = ({ getCurrentProfile, auth, profile: {profile, loading} }) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);
  
  // We dont want to load components before we get profile data from the server.
  // If the profile is null and is still loading then show spinner.
  // Else show Fragment
  return loading && profile === null ? <Spinner /> : <Fragment> TEST </Fragment>
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);

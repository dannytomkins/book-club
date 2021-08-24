import React, { Fragment, useState } from 'react';
// import withRouter to access history
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { createClub } from '../../actions/club';

const CreateClub = ({ createClub, history }) => {
    
    
    return (
        <div>
            
        </div>
    )
}

CreateClub.propTypes = {
    createClub: PropTypes.func.isRequired,
}

export default connect(null, { createClub })(withRouter(CreateClub))

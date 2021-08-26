import React, { Fragment, useState, useEffect } from 'react';
// import withRouter to access history
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createClub, getClub } from '../../actions/club';

const EditClub = ({
  club: { club, loading },
  createClub,
  getClub,
  history,
  match
}) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  useEffect(() => {
    getClub(match.params.id);
    setFormData({
      name: loading || !club.name ? '' : club.name,
      description: loading || !club.description ? '' : club.description,
    });
  }, [loading, getClub]);

  const { name, description } = formData;

  // onChange, setFormData get the rest of the formData object, get field by name use as key, get the value use as value
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createClub(formData, history, true);
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Edit Your Club</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Let's get some information to make your
        club!
      </p>
      <small>* = required field</small>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Club name'
            name='name'
            value={name}
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>
            What would you like to name your club?
          </small>
        </div>

        <div className='form-group'>
          <textarea
            placeholder='A description of your club'
            name='description'
            value={description}
            onChange={(e) => onChange(e)}
          ></textarea>
          <small className='form-text'>Tell us a little about your club.</small>
        </div>

        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to='/dashboard'>
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

EditClub.propTypes = {
  createClub: PropTypes.func.isRequired,
  getClub: PropTypes.func.isRequired,
  club: PropTypes.object.isRequired,
};

// need to bring in club state
const mapStateToProps = (state) => ({
  club: state.club,
});

export default connect(mapStateToProps, { createClub, getClub })(
  withRouter(EditClub)
);

import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ClubItem from '../clubs/ClubItem';
import PostForm from '../posts/PostForm';
import PostItem from '../posts/PostItem';
import { getClub } from '../../actions/club';
import { getPostsByClub } from '../../actions/post';

// bring in match to get the id from the URL
const Club = ({ getClub, getPostsByClub, club: { club, loading }, post: { posts }, match }) => {
  useEffect(() => {
    getClub(match.params.id);
  }, [getClub]);

  useEffect(() => {
    getPostsByClub(match.params.id);
  }, [getPostsByClub]);

  return loading || club === null ? (
    <Spinner />
  ) : (
    <Fragment>
        <Link to='/clubs' className='btn'>
            Back To Clubs
        </Link>
      <ClubItem club={club} showActions={true}/>
      <PostForm club={club }/>
      <div className='posts'>
        {posts.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </div>
    </Fragment>
  );
};

Club.propTypes = {
  getClub: PropTypes.func.isRequired,
  getPostsByClub: PropTypes.func.isRequired,
  club: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  club: state.club,
  post: state.post,
});

export default connect(mapStateToProps, { getClub, getPostsByClub })(Club);
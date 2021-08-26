import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
import { getPost } from '../../actions/post'

// bring in match to get the id from the URL
const Post = ({ getPost, post: { post, loading }, match }) => {
    useEffect(() => {
        getPost(match.params.id)
    }, [getPost])
    
    return (
        <div>
            <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt ducimus facilis iure sit sapiente rem voluptates nulla id deserunt minima a neque, quas provident consequuntur aliquam omnis eveniet nemo itaque.</h1>
        </div>
    )
}

Post.propTypes = {
    getPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    post: state.post
})

export default connect(mapStateToProps, {getPost})(Post)

import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const ProfileItem = ({ profile: {
    user: {_id, name, avatar },
    status,
    location,
    favorites
}}) => {
    return (
        <div className="profile bg-light">
            <img src={avatar} alt="" className="round-img" />
            <div>
                <h2>{name}</h2>
                <p>{status && <span>{status}</span>}</p>
                <p className="my-1">{location && <span>{location}</span>}</p>
                <Link to={`profile/${_id}`} className='btn btn-primary'>
                    View Profile
                </Link>
            </div>
            <ul>
                {favorites.slice(0,5).map((book, _id) => (
                    <li key={_id} className="text-primary">
                        <i className="fas fa-bookmark" />{book.book.title}
                    </li>
                ))}
            </ul>
        </div>
    )
}

ProfileItem.propTypes = {
    profile: PropTypes.object.isRequired,
}

export default ProfileItem

import React from 'react'
import PropTypes from 'prop-types'

const ProfileClub = ({ club: { name, description }}) => {
    return (
        <div>
            <h3 className="text-dark">{name}</h3>
            <p>
                <strong>Description: </strong>{description}
            </p>
        </div>
    )
}

ProfileClub.propTypes = {
    club: PropTypes.array.isRequired,
}

export default ProfileClub

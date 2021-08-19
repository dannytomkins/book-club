import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-router-dom'
import { clubsIn } from '../../actions/club'

// pass in clubsIn from somewhere
const ClubsIn = ({ clubsIn }) => {
    const myClubs = clubsIn.map(club => (
        <td key={club._id}>
            <td>{club.name}</td>
            <td>{club.description}</td>
        </td>
    ))
    return (
        <Fragment>
            <h2 className="my2">My Clubs</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th className='hide-sm'>Name</th>
                        <th className='hide-sm'>Description</th>
                    </tr>
                </thead>
                <tbody>{myClubs}</tbody>
            </table>
        </Fragment>
    )
}

ClubsIn.propTypes = {
    clubsIn: PropTypes.array.isRequired,
}

export default ClubsIn

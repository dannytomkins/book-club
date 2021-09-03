import React from 'react'
import PropTypes from 'prop-types'

const SearchBooks = ({onSubmit, onChange, term}) => {
    return (
        <form onSubmit={onSubmit}>
        <div className="input-group mb-3">
            <input type="text" className="form-control" placeholder="Search by title." aria-label="Title" aria-describedby="basic-addon2" value={term} onChange={(e) => onChange(e)} />
                <div className="input-group-append">
                    <button type="submit" className="btn btn-primary">Search</button>
                </div>
        </div>
        </form>
    )
}

SearchBooks.propTypes = {

}

export default SearchBooks

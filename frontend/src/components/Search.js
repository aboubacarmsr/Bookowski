import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const Search = () => {
    return (
        <div className="search">
            <input type="text" placeholder="Search ..."/>
            <FontAwesomeIcon icon={faSearch} className="search-icon"/>
        </div>
    )
}

export default Search

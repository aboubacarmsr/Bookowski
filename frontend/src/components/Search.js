import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const Search = ({ sidenav }) => {
    const history = useHistory();
    const [keyword, setKeyword] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();
        if(keyword.trim()) {
            history.push(`/search/${keyword}`)
        } else {
            history.push('/')
        }
    }

    return (
        <div className="search">
            <form onSubmit={submitHandler}>
                <input type="text" placeholder="Search ..." onChange={(e) => setKeyword(e.target.value)} />
                <FontAwesomeIcon icon={faSearch} className={ sidenav ? "search-icon side" : "search-icon"} 
                    onClick={submitHandler}/>
            </form>
        </div>
    )
}

export default Search

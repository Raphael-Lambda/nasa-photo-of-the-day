import React from 'react'
import "./header.css"


function Header(props){
    const { makeSearch } = props
    return(
        <header>
            <div className="headerContent">
                <h1>Photo of the day</h1>
                <div className="search">
                    <p>Search in the last year's pictures</p>
                    <input type='text' placeholder='search' onKeyDown={(e) => {makeSearch(e)}}/>
                </div>
            </div>
        </header>
    )
}

export default Header
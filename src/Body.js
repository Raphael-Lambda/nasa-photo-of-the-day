import React from 'react'
import './body.css'
import Picture from './Picture'


const Body = ({ selectedDate, dayMinusOne, dayPlusOne }) => {
    
    return(
        <div className="bodyContent">
            <Picture selectedDate={selectedDate} dayMinusOne={dayMinusOne} dayPlusOne={dayPlusOne}/>
        </div>
    )
}

export default Body
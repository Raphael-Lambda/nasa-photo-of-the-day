import './picture.css'
import React, { useState, useEffect} from 'react'
import { BASE_URL, API_KEY } from './constants'
import axios from "axios"


const Picture = props => {
    const { dayPlusOne, dayMinusOne, selectedDate } = props
    const now = new Date().getTime()
    const todayHoursUTC = now % (24 * 3600000)
    const todayEastern = now - (todayHoursUTC + (2*24 * 3600000))
    //call Api when selectedDate changes
    const [POTD, setPOTD] = useState({})
    useEffect(() => {

        // the date provided to the API should be YYYY-MM-DD format
        const apiDate = new Date(selectedDate).toISOString().slice(0,10)
        const address = `${BASE_URL}?date=${apiDate}&api_key=${API_KEY}`
        axios
        .get(address)
        .then((response) => { setPOTD(response.data) })
        .catch(err => console.log(err))
    },[selectedDate]
    )
    
    return(
        <>
        <h2>{POTD.title}</h2>
        <div className="imageContainer">
            {POTD.date !== (new Date(todayEastern).toISOString().slice(0,10)) && <div className="arrow Right" onClick={() => {dayPlusOne()}}>&gt;</div>}
            {POTD.media_type === "video"?<iframe src={POTD.url} title={POTD.title} className="picture"></iframe>:<img src={POTD.url} alt={POTD.title} className="picture"></img>}
            <div className="arrow Left" onClick={() => {dayMinusOne()}}>&lt;</div>

        </div>
        <p>{POTD.explanation}</p>
        </>
    )
}

export default Picture
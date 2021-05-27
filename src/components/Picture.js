import React, { useState, useEffect} from 'react'
import { BASE_URL, API_KEY } from '../constants/constants'
import axios from "axios"
import styled from 'styled-components'

/* 
=============================
styled Components
=============================
*/
const Explanation = styled.p`
    font-weight: 500;
    font-size 18px;
    text-align: justify;
    line-height: 22px;
    letter-spacing 3px;
`
const ImageContainer= styled.div`
    position: relative;
`
const Arrow= styled.div`
    position: absolute;
    height: 60px;
    width: 60px;
    border-radius: 30px;
    font-size: 50px;
    opacity: .3;
    top: 50%;
    ${props => props.type === 'right'? "right: 5px": "left: 5px"};
    &:hover{
        opacity: 1;
    }
`
const PictureStyle = styled.img`
    width: 90%;
    height: 90%;
`
const Frame = styled.iframe`
    width: 90%;
    height: 90%;
`
const ImageTitle = styled.div`
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-around;
    font-variant: small-caps;
    &p{
        font-family:Consolas,Monaco,Lucida Console,Liberation Mono,DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New;
    }
`

/* 
=============================
component
=============================
*/

const Picture = ({ dayPlusOne, dayMinusOne, selectedDate, searchResult }) => {
    // compute today date (East US)
    const now = new Date().getTime()
    const todayHoursUTC = now % (24 * 3600000)
    const todayEastern = now - (todayHoursUTC + (2 * 24 * 3600000))

    //declare slice of state for the picture of the day object
    const [POTD, setPOTD] = useState({})
        
    //call Api when selectedDate changes
    useEffect(() => {
        // the date provided to the API should be YYYY-MM-DD format
        let apiDate = new Date(selectedDate).toISOString().slice(0,10)

        //if the user searched a specific entry selectedDate should already be in the good format
        if(searchResult){
            apiDate = selectedDate
        }
        //create url
        const address = `${BASE_URL}?date=${apiDate}&api_key=${API_KEY}`
        //api call
        axios
        .get(address)
        .then((response) => { setPOTD(response.data) })
        .catch(err => console.log(err))
    },[selectedDate]
    )

    return(
        <>
        <ImageTitle>
        <h2>{POTD.title}</h2>
        <p>{POTD.date}</p>
        </ImageTitle>
        <ImageContainer>
            {POTD.date !== (new Date(todayEastern).toISOString().slice(0,10)) && <Arrow type="right" onClick={() => {dayPlusOne()}}>&gt;</Arrow>}
            {POTD.media_type === "video"?<Frame src={POTD.url} title={POTD.title}></Frame>:<PictureStyle src={POTD.url} alt={POTD.title}></PictureStyle>}
            <Arrow onClick={() => {dayMinusOne()}}>&lt;</Arrow>
        </ImageContainer>
        <Explanation>{POTD.explanation}</Explanation>
        </>
    )
}

export default Picture
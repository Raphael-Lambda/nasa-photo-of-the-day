import React from 'react'
import Picture from './Picture'
import styled from 'styled-components'

/* 
=============================
styled Components
=============================
*/

const BodyContent = styled.div`
    padding: 50px 100px 150px 100px;
`


/* 
=============================
Component
=============================
*/

const Body = ({ selectedDate, dayMinusOne, dayPlusOne, searchResult }) => {
    return(
        <BodyContent>
            <Picture selectedDate={selectedDate} dayMinusOne={dayMinusOne} dayPlusOne={dayPlusOne} searchResult={searchResult}/>
        </BodyContent>
    )
}

export default Body
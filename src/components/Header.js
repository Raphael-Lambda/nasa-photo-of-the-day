import React, { useState } from 'react'
import styled from 'styled-components'

/* 
=============================
styled Components
=============================
*/

const AppHeader = styled.div`
    background-color: #282c34;
    display: flex;
    flex-direction: column;
    align-items: space-around;
    justify-content: center;
    font-size: calc(10px + 2vmin);
    color: white;
`
const AppH1 = styled.h1`
    padding-left: 50px;
`
const AppSearch = styled.div`
    padding-top:10px;
    height: 80%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-evenly;
    align-items: center;
`
const AppInput = styled.input`
    margin: 0 150px 0 30px;
    height: 100%;
`
const HeaderContent = styled.div`
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    padding-bottom: 5px;
    border-bottom: 2px dashed lightgrey;
`

/* 
=============================
Component
=============================
*/


function Header(props){

    const [inputValue, setInputValue] = useState('')
    const { makeSearch } = props

    function changeValue(e){
        const { value } = e.target
        setInputValue(value)
    }

    return(
        <AppHeader>
            <HeaderContent>
                <AppH1>Photo of the day</AppH1>
                <AppSearch>
                    <p>Search in the last year's pictures</p>
                    <AppInput type='text' placeholder='search' value={inputValue} onInput={(e) => changeValue(e)} onKeyDown={(e) => {makeSearch(e)}}/>
                </AppSearch>
            </HeaderContent>
        </AppHeader>
    )
}

export default Header
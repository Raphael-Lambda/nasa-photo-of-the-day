import { interpolate } from "gsap/gsap-core";
import React, { useState } from "react";
// import "./App.css";
import Header from './components/Header'
import Body from './components/Body'
import axios from "axios";
import {BASE_URL, API_KEY} from './constants/constants'
import styled from 'styled-components'
import SkyBackground from './img/skyBackground.jpeg'



/* 
=============================
styled Components
=============================
*/

const AppClass = styled.div`
  text-align: center;
`

const Background = styled.div`
  background-image: url(${SkyBackground});
  background-repeat: no-repeat;
  background-size: 100% 100%;
`
/* 
=============================
Component
=============================
*/

function App() {
  const [searchResult, setSearchResult] = useState('') 
  //get today's time and set it to US eastern time 
  const now = new Date().getTime()
  const todayHoursUTC = now % (24 * 3600000)
  const todayEastern = now - (todayHoursUTC + (2*24 * 3600000))
  // store the date in ms 
  const [ selectedDate, setSelectedDate ] = useState(todayEastern) 

  function dayPlusOne(){
    if(searchResult){
      //need to handle index out of range returning undefined
      setSelectedDate(searchResult.slice(searchResult.indexOf(selectedDate),)[1] || searchResult[0])
    }
    else{
      const newDate = selectedDate + (1000 * 3600 * 24)
      setSelectedDate(newDate)
    }
  }

  function dayMinusOne(){
    if(searchResult){
      //need to handle index out of range returning undefined
      setSelectedDate(searchResult.slice(0,searchResult.indexOf(selectedDate))[searchResult.indexOf(selectedDate) - 1] || searchResult[searchResult.length - 1])
    }
    else{
      const newDate = selectedDate - (1000 * 3600 * 24)
      setSelectedDate(newDate)
    }
  }

  //search function need to return one or more date(s)
  const makeSearch = (evt) => {
    const { value } = evt.target

    if(evt.key === 'Enter'){
      console.log(`searching for ${value}`)
      const start_date = new Date(todayEastern - (3600000 *24 *30)).toISOString().slice(0,10)
      const end_date = new Date(selectedDate).toISOString().slice(0,10)
      const urlForAYear = `${BASE_URL}?start_date=${start_date}&end_date=${end_date}&api_key=${API_KEY}`
      axios
      .get(urlForAYear)
      .then(response => {
        let select = response.data.filter(item => item.explanation.includes(value))
        select = select.map(item => {return(item.date)})
        setSearchResult(select)
      })
      .catch(err => console.log(err));
    }

  }

  return (
    <AppClass>
      <Header makeSearch={makeSearch}/>
      <Background>
        <Body selectedDate={selectedDate} dayMinusOne={dayMinusOne} dayPlusOne={dayPlusOne} searchResult={searchResult}/>
      </Background>
   </AppClass>
  );
}

export default App;

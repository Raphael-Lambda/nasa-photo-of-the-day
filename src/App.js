import { interpolate } from "gsap/gsap-core";
import React, { useState } from "react";
import "./App.css";
import Header from './Header'
import Body from './Body'

function App() {
  const [ search, setSearch ] = useState('') 
  //get today's time and set it to US eastern time 
  const now = new Date().getTime()
  const todayHoursUTC = now % (24 * 3600000)
  const todayEastern = now - (todayHoursUTC + (2*24 * 3600000))
  // store the date in ms 
  const [ selectedDate, setSelectedDate ] = useState(todayEastern)

  

  function dayPlusOne(){
    const newDate = selectedDate + (1000 * 3600 * 24)
    setSelectedDate(newDate)
  }

  function dayMinusOne(){
    const newDate = selectedDate - (1000 * 3600 * 24)
    setSelectedDate(newDate)
  }

  //search function need to return one or more date(s)
  const makeSearch = (evt) => {
    console.log(evt)
  }

  return (
    <div className="App">
      <Header makeSearch={makeSearch}/>
      <Body selectedDate={selectedDate} dayMinusOne={dayMinusOne} dayPlusOne={dayPlusOne}/>
    </div>
  );
}

export default App;

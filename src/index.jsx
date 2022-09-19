import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import './style.css';
import cities from './cities.json'

const App = () => {
  const[sunrise, setSunrise] =useState()
  const[sunset, setSunset] =useState()
  const[selectedDate, setSelectedDate] = useState("")
  

  const [lat, setLat] = useState();
  const [long, setLong] = useState();
  const [city, setCity] =useState("")

    // API documentation - https://sunrise-sunset.org/api
  // &date=2022-09-13
  // lat (float): Latitude in decimal degrees. Required.
  // lng (float): Longitude in decimal degrees. Required.
  const handleSubmit = (event) => {
    event.preventDefault()

    const data = event.target.value // ziskam napr.Tirana,41.3275000,19.8188896
    const mesto = data.split(',')
    const vybraneMesto = mesto[0]
    const vybranaLat = mesto[1]
    const vybranaLong = mesto[2]  
     
    setCity(vybraneMesto)
    setLat(vybranaLat)
    setLong(vybranaLong)
    
   
  fetch(`https://api.sunrise-sunset.org/json?lat=${lat}&lng=${long}`)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    setSunrise(data.results.sunrise);
    setSunset(data.results.sunset)
  });
}

  const CityOptions = ({cities}) => {
    return(
      <>
      <option value="">{city==="" ? "Choose City" : city}</option>
      {cities.city.map((city) => (
        <option 
          value={[city.name, city.lat, city.long]}
          key={city.name}
          latitude={city.lat}
          longtitude={city.long}>{city.name}</option>
      ))}
      </>
    )
  }
  

  return (
    <div className="container">
      <form className='city-date__form'
        onChange={handleSubmit}>
        <label>
          <select>
            <CityOptions cities={cities}/>
          </select>
        </label>
        
        <DatePicker 
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat='dd.MM.yyyy'
          value={selectedDate===""? "Choose a day" : selectedDate}
          />
       </form>
      
    
      <header>
        <div className="logo" />
        <h1>Sunrise and sunset</h1>
        <p>{city}</p>
        <p>lat {lat} a long {long}</p>
        <p>Sunrise {sunrise}</p>
        <p>Sunset {sunset}</p>
      </header>
    </div>
  );
};

createRoot(
  document.querySelector('#app'),
).render(<App />);

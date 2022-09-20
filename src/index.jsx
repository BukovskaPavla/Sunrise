import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import './style.css';
import countries from './countries.json'

const App = () => {
  const [sunrise, setSunrise] = useState()
  const [sunset, setSunset] = useState()
  const [selectedDate, setSelectedDate] = useState("")
  const [datum, setDatum] = useState("")
  const [lat, setLat] = useState();
  const [long, setLong] = useState();
  const [country, setCountry] =useState("Null Island")

  // API documentation - https://sunrise-sunset.org/api&date=2022-09-13
  // lat (float): Latitude in decimal degrees
  // lng (float): Longitude in decimal degrees
    fetch(`https://api.sunrise-sunset.org/json?lat=${lat}&lng=${long}&date=${datum}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      setSunrise(data.results.sunrise);
      setSunset(data.results.sunset)
    })
 
  const CountryOptions = ({country}) => {
    return(
      <>
      <option value="">{country==="" ? "Choose Country" : country}</option>
      {countries.country.map((country) => (
        <option 
          value={[country.name, country.lat, country.long]}
          key={country.name}
          latitude={country.lat}
          longtitude={country.long}>{country.name}</option>
      ))}
      </>
    )
  }
  
  const Datum = (date) => {
    const den = (new Date(date).getDate()).toString().padStart(2,'0')
    const mesic = (new Date(date).getMonth()+1).toString().padStart(2,'0')
    const rok = new Date(date).getFullYear()
    return (setDatum(rok + "-" + mesic + "-" + den), setSelectedDate(date) )
  }

  const changeCountry = (event) => {
    const data = event.target.value // ziskam napr.Tirana,41.3275000,19.8188896
    setCountry(data.split(',')[0])
    setLat(data.split(',')[1])
    setLong(data.split(',')[2])
  }

  return (
    <div className="container">
      
      <form  className="form">
        <select onChange={changeCountry}>
          <CountryOptions country={country} />
        </select>
                       
        <DatePicker 
          selected={selectedDate}
          onChange={Datum}
          dateFormat='dd.MM.yyyy'
          value={selectedDate===""? "Choose a day" : selectedDate}
        /> 
      </form>
      <div className="results">
        <h1>Sunrise and sunset</h1>
        <h3>{country}</h3>
        <h3>{datum}</h3>
        <p>Sunrise: {sunrise} UTC</p>
        <p>Sunset: {sunset} UTC</p>
      </div>
    </div>
  );
};

createRoot(
  document.querySelector('#app'),
).render(<App />);

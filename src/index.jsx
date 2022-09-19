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
  
  const[year, setYear]= useState()
  const[month, setMonth]= useState()
  const[day, setDay]= useState()
  const[datum, setDatum] = useState("")
 
  const [lat, setLat] = useState();
  const [long, setLong] = useState();
  const [city, setCity] =useState("")

  // API documentation - https://sunrise-sunset.org/api
  // &date=2022-09-13
  // lat (float): Latitude in decimal degrees. Required.
  // lng (float): Longitude in decimal degrees. Required.
  const handleSubmit = (event) => {
    event.preventDefault()
    setDatum(year + "-" + month + "-" + day)

    const data = event.target.value // ziskam napr.Tirana,41.3275000,19.8188896
    setCity(data.split(',')[0])
    setLat(data.split(',')[1])
    setLong(data.split(',')[2])
   

    fetch(`https://api.sunrise-sunset.org/json?lat=${lat}&lng=${long}&date=${datum}`)
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
      
      <form className='city-date__form' onChange={handleSubmit}>
        <select>
          <CityOptions cities={cities}/>
        </select>
                
        <DatePicker 
          selected={selectedDate}
          onChange={(date) => {
            setSelectedDate(date);
            setYear(new Date(date).getFullYear());
            setMonth((new Date(date).getMonth()+1).toString().padStart(2,'0'));
            setDay((new Date(date).getDate()).toString().padStart(2,'0'))
            }}
          dateFormat='dd.MM.yyyy'
          value={selectedDate===""? "Choose a day" : selectedDate}
        />
      </form>
      <div className="results">
        <h1>Sunrise and sunset</h1>
        <p>{city}</p>
        <p>{datum}</p>
        <p>Sunrise {sunrise}</p>
        <p>Sunset {sunset}</p>
      </div>
    </div>
  );
};

createRoot(
  document.querySelector('#app'),
).render(<App />);

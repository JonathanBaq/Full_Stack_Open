import React, { useState, useEffect }  from 'react'
import axios from 'axios'

const Weather = ({capital}) => {
    const [weather, setWeather] = useState({})
    
    const api_key = process.env.REACT_APP_API_KEY

    useEffect(() => {
        axios
          .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`)
          .then(response => {
            console.log('promise fulfilled')
            setWeather(response.data)
          })
      }, []);
    
    return(
        <div>
          <h2>Weather in {capital}</h2>
          {weather.current && (
            <div>
              <p><strong>Temperature:</strong> {weather.current.temperature} &deg;C </p>
              <p>Feels like {weather.current.feelslike} &deg;C </p>
              <img alt='weather' src={weather.current.weather_icons} />
              <p> <strong>Wind:</strong> {weather.current.wind_speed} mph direction {weather.current.wind_dir} </p>
            </div>
          )}
        </div>
    )
}

export default Weather
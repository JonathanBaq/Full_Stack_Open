import React from 'react'
import Weather from './Weather'

const Country = ({country}) => {
   return (
    <div>
        <h1>{country.name}</h1>
        <div>capital {country.capital}</div>
        <div>population {country.population}</div>
        <h2>Languages</h2>
        <div>
            <ul>
               {country.languages.map(language => 
                <li key={language.iso639_1}>{language.name}</li>)}
            </ul>
        </div>
        <div>
            <img src={country.flag} alt="flag" width="250" height="200"/>
        </div>
        <Weather capital={country.capital}/>
    </div>
   ) 
}

export default Country
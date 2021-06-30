import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Results from './components/Results'

const App = () => {
  const [countries, setCountries] = useState([]);
  const [newFilter, setNewFilter] = useState('');
  const [results, setResults] = useState([]);
  
  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
          setCountries(response.data);
      })
  }, []);

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
    let results = countries.filter(country => country.name.toLowerCase().includes(newFilter.toLowerCase()));
    setResults(results);
  };

  const handleClick = (event) => {
    setNewFilter(event.target.value);
    let results = countries.filter(country => country.name.includes(event.target.value));
    setResults(results);
  };

  return (
    <div>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>
      <Results results={results} handleClick={handleClick}/>
    </div>
  )
};

export default App;
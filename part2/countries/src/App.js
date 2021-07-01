import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './Components/Filter';
import Countries from './Components/Countries'

const App = () => {
  const [nameFilter, setNameFilter] = useState('');
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [showAlls, setShowAlls] = useState(new Array(filteredCountries.length).fill(false));

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(res => {
        setCountries(res.data);
      })
  }, []);

  const handleSearch = event => {
    const newNameFiltered = event.target.value;
    setNameFilter(newNameFiltered);
    setFilteredCountries(countries.filter(country => {
      return country.name.toUpperCase().includes(newNameFiltered.toUpperCase());
    }));
  }

  const handleClick = event => {
    const index = parseInt(event.target.getAttribute('index'));
    console.log(index);
    const copy = [...showAlls];
    copy[index] = !copy[index];
    setShowAlls(copy);
  }

  return (
    <>
      <Filter handleSearch={handleSearch} name={nameFilter} />
      <Countries countries={filteredCountries} handleClick={handleClick} showAlls={showAlls} />
    </>
  )
};

export default App;
import React, {useState, useEffect} from 'react';
import Weather from './Weather';
import axios from 'axios';

const api_key = process.env.REACT_APP_API_KEY;

const Country = props => {
  const [weather, setWeather] = useState({condition: {
    text: 'placeholder',
    icon: 'placeholder',
    code: 'placeholder'
  }});
  const {name, capital, population, languages, flag} = props.country;

  useEffect(() => {
    if (props.showDetail)
      axios
        .get(`http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${capital}&aqi=no`)
        .then(res => {
          setWeather(res.data.current);
        })
  }, [capital, props.showDetail]);

  if (props.showDetail) {

    return (
      <>
        <h1>{name}</h1>
        <p>capital {capital}</p>
        <p>population {population}</p>

        <h2>Spoken languages</h2>
        <ul>
          {languages.map(language => {
            return <li key={language.iso639_1}>{language.name}</li>;
          })}
        </ul>

        <img src={flag} alt={name} width="10%" height="10%" />

        <Weather weather={weather} capital={capital} />
      </>
    )
  }
  else return <p>{name}</p>
}

const Countries = props => {
  if (props.countries.length === 1)
    return <Country country={props.countries[0]} showDetail={true} />;
  else if (props.countries.length > 10)
    return <p>Too many matches, specify another filter</p>;
  return (
    <>
      {props.countries.map((country, index) => {
        return (
          <div key={country.name}>
            <Country country={country} showDetail={props.showAlls[index]} />
            <button index={index} onClick={props.handleClick}>
              {props.showAlls[index] ? 'hide' : 'show'}
            </button>
          </div>
        );
      })}
    </>
  );
};

export default Countries;
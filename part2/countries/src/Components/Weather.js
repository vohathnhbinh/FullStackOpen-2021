import React from 'react';

const Weather = ({capital, weather}) => {
  return (
    <>
      <h2>Weather in {capital}</h2>
      <p>temperature: {weather.temp_c} Celcius</p>
      <img src={weather.condition.icon} alt={weather.condition.text} />
      <p>wind: {weather.wind_kph} direction {weather.wind_dir}</p>
    </>
  );
};

export default Weather;
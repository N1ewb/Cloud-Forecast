import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'
import LocationIcon from './images/icons8-location-50.png'
import TempIcon from './images/icons8-temperature-32.png'
import WeatherList from './components/WeatherList';


const API_URL =`https://api.open-meteo.com/v1/forecast?latitude=8.2289&longitude=124.2434&hourly=temperature_2m,rain&forecast_days=1&current=temperature_2m%2Crelative_humidity_2m%2Capparent_temperature%2Cis_day%2Cprecipitation%2Crain%2Cweather_code%2Ccloud_cover%2Cpressure_msl%2Csurface_pressure%2Cwind_speed_10m%2Cwind_direction_10m%2Cwind_gusts_10m&fbclid=IwAR1elpkRSM76mWf6irPZzuAzQjr89XrzH51iQfYLABFyu8xAtL5fIT7Chis`

const App = () => {
  const [main, setMain] = useState(null);
  const [hourly, setHourly] = useState(null)
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(`${API_URL}`);
        const currentMain = response.data.current;
        const hourlyMain = response.data.hourly
        console.log(response.data)
        setMain(currentMain);
        setHourly(hourlyMain)
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setError('Unable to fetch weather data.');
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
    
    <div className='App'>
      <div className='container'>
        <section className='first-section'>
          <div className='img-container'><img src="./android-launchericon-512-512.png" alt="cloud forecast" height="450px" width="450px"/></div>
          <div className='weather-container'>
            <h1 className='city'>Iligan City</h1>
            <img className="locaion-icon" src={LocationIcon} alt="location-icon" height="15px" width="15px"/>
            <p className='temperature'>{main.temperature_2m}°C</p>
          </div>
        </section>
        <section className='second-section'>
          <h4>Hourly Temperatures</h4>
          <WeatherList hourly={hourly}/>
          <div className='flares-container'>
            <h4>Weather Details</h4>
            <div className='details-card'>
              <div className='wcards apparent-temp'>
                <img src={TempIcon} alt="temperature" height="20px" width="20px"/>
                <p>Feels Like</p>
                <h5>{main.apparent_temperature}°</h5>
              </div>
              <div className='wcards wind'>
              <img src={TempIcon} alt="temperature" height="20px" width="20px"/>
                <p>SSE Wind</p>
                <h5>{main.wind_speed_10m}km/h</h5>
              </div>
              <div className='wcards Humidity'>
              <img src={TempIcon} alt="temperature" height="20px" width="20px"/>
                <p>Humidity</p>
                <h5>{main.relative_humidity_2m}%rh</h5>
              </div>
              <div className='wcards pressure'>
              <img src={TempIcon} alt="temperature" height="20px" width="20px"/>
                <p>Surface Pressure</p>
                <h5>{main.surface_pressure}hPa</h5>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
    </>
  );
};

export default App;

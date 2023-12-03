import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'
import LocationIcon from './images/icons8-location-50.png'
import TempIcon from './images/icons8-temperature-32.png'
import WindIcon from './images/icons8-wind-50.png'
import HumidityIcon from './images/icons8-humidity-32.png'
import PressureIcon from './images/icons8-uneven-surface-64.png'
import WeatherList from './components/WeatherList';


const API_URL =`https://api.open-meteo.com/v1/forecast?`
const ACESS_KEY = "pk.81e491f248aa4dbd5ed6d092ba5ccca8"

const App = () => {
  const [longitude, setLongitude] = useState(0)
  const [latitude, setLatitude] = useState(0)
  const [search, setSearch] = useState('Tomas Cabili')
  const [location, setLocation] = useState(0)
  const [main, setMain] = useState(null);
  const [hourly, setHourly] = useState(null)
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchLocation = async (address) => { 
    try {
      navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude)
        setLongitude(position.coords.longitude)
      })
      const response = await axios.get(`https://us1.locationiq.com/v1/search?key=${ACESS_KEY}&q=${address}&format=json`)
      const currentLocation = response.data
      const filteredLocations = currentLocation.find(loc => loc.type === "administrative" || loc.type === "quarter");
      setLocation(filteredLocations)
    }catch{  
      console.log(error)
    }
  }
  
  const fetchWeather = async () => {
      try {
        let apiUrl;
        if (location && location.lon !== "undefined") {
          apiUrl = `${API_URL}latitude=${location.lat}&longitude=${location.lon}&hourly=temperature_2m,rain&forecast_days=1&current=temperature_2m%2Crelative_humidity_2m%2Capparent_temperature%2Cis_day%2Cprecipitation%2Crain%2Cweather_code%2Ccloud_cover%2Cpressure_msl%2Csurface_pressure%2Cwind_speed_10m%2Cwind_direction_10m%2Cwind_gusts_10m&fbclid=IwAR1elpkRSM76mWf6irPZzuAzQjr89XrzH51iQfYLABFyu8xAtL5fIT7Chis`;
        } else {
          apiUrl = `${API_URL}latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,rain&forecast_days=1&current=temperature_2m%2Crelative_humidity_2m%2Capparent_temperature%2Cis_day%2Cprecipitation%2Crain%2Cweather_code%2Ccloud_cover%2Cpressure_msl%2Csurface_pressure%2Cwind_speed_10m%2Cwind_direction_10m%2Cwind_gusts_10m&fbclid=IwAR1elpkRSM76mWf6irPZzuAzQjr89XrzH51iQfYLABFyu8xAtL5fIT7Chis`;
        }
        const response = await axios.get(apiUrl);const currentMain = response.data.current;
        const hourlyMain = response.data.hourly
        setMain(currentMain);
        setHourly(hourlyMain)
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setError('Unable to fetch weather data.');
      } finally {
        setLoading(false);
      }
    };
  const handleSearch = () => {
    setSearch(search)
    fetchLocation(search)
    fetchWeather();
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearch(search)
    }, 1500);
    return () => clearTimeout(timer);
    
  }, [search]);

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
          <div className='img-container'><img src="./android-launchericon-512-512.png" alt="cloud forecast" height="380px" width="380px"/></div>
          <div className='weather-container'>
            <div className='search-bar'>
              <input onChange={(e)=> setSearch(e.target.value)} value={search} type="text" name="search" placeholder='Search...'/>
              <button onClick={handleSearch}>Search</button>
            </div>
              {location && location.display_name ? (
              <>
                <h1>{location.display_name}</h1>
                <img className="locaion-icon" src={LocationIcon} alt="location-icon" height="15px" width="15px"/>
                <p className='temperature'>{main.temperature_2m}°C</p>
              </>
              ) : (
                <h1>No result</h1>
              )}
            
          </div>
        </section>
        <section className='second-section'>
        {location && location.display_name ? (
              <>
               <h4>Hourly Temperatures</h4>
          <WeatherList hourly={hourly} location={location}/>
          <div className='flares-container'>
            <h4>Weather Details</h4>
            <div className='details-card'>
              <div className='wcards apparent-temp'>
                <img src={TempIcon} alt="temperature" height="20px" width="20px"/>
                <p>Feels Like</p>
                <h5>{main.apparent_temperature}°</h5>
              </div>
              <div className='wcards wind'>
              <img src={WindIcon} alt="temperature" height="20px" width="20px"/>
                <p>SSE Wind</p>
                <h5>{main.wind_speed_10m}km/h</h5>
              </div>
              <div className='wcards Humidity'>
              <img src={HumidityIcon} alt="temperature" height="20px" width="20px"/>
                <p>Humidity</p>
                <h5>{main.relative_humidity_2m}%rh</h5>
              </div>
              <div className='wcards pressure'>
              <img src={PressureIcon} alt="temperature" height="20px" width="20px"/>
                <p>Surface Pressure</p>
                <h5>{main.surface_pressure}hPa</h5>
              </div>
            </div>
          </div>
              </>
              ) : (
                <>
                  <h4>Hourly Temperatures</h4>
          <WeatherList hourly={hourly} location={location}/>
          <div className='flares-container'>
            <h4>Weather Details</h4>
            <div className='details-card'>
              <div className='wcards apparent-temp'>
                <img src={TempIcon} alt="temperature" height="20px" width="20px"/>
                <p>Feels Like</p>
                <h5></h5>
              </div>
              <div className='wcards wind'>
              <img src={WindIcon} alt="temperature" height="20px" width="20px"/>
                <p>SSE Wind</p>
                <h5></h5>
              </div>
              <div className='wcards Humidity'>
              <img src={HumidityIcon} alt="temperature" height="20px" width="20px"/>
                <p>Humidity</p>
                <h5></h5>
              </div>
              <div className='wcards pressure'>
              <img src={PressureIcon} alt="temperature" height="20px" width="20px"/>
                <p>Surface Pressure</p>
                <h5></h5>
              </div>
            </div>
          </div>
                </>
              )}     
        </section>
      </div>
    </div>
    </>
  );
};

export default App;

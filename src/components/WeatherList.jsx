import React from 'react'
import Weathercard from './Weathercard'

const WeatherList = ({hourly}) => {
  return (
    <>
        <div className='card-container'>
            <p></p>
            {hourly.time.map((time, index) => (
                <Weathercard temperature={hourly.temperature_2m[index]} time={time}/>
            ))}
        </div>
    </>
  )
}

export default WeatherList
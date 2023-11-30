import React from 'react'
import CloudsIcon from '../images/icons8-clouds-50.png'
const Weathercard = ({temperature, time}) => {
    const dateObject = new Date(time);

    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    const formattedTime = `${hours}:${minutes}${0}`;

    console.log(formattedTime);
  return (
    <>
        <div className='card'>
            <div className='card-body'>
                <p>{formattedTime}</p>
                <img src={CloudsIcon} alt="clouds" height="50px" width="50px"/>
                <p>{temperature}</p>
            </div>
        </div>
    </>
  )
}

export default Weathercard
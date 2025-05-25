import React, { useState, useEffect } from 'react'
import './TodaysWeather.css'

function TodaysWeather(props) {

  // States initializations
  const { error, searchResult } = props;
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Get window size for mobile and web display adjustments
  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);

    // Cleanup listener on unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return (
    <>
    {/* When search error occurs, display error message. */}
    {
      (error) &&

      <div className='search-error'>{error}</div>
    }

    {/* When there is no search result when reloading / loading app for the first time. */}
    {
      (searchResult === null && error === null) &&

      <div className='no-search'>No search has been done yet.</div>
    }

    {/* Display search result */}
    {
      (searchResult !== null && error === null) &&
      
      <> 
      <div className={`todays-weather-div ${windowWidth <= 500} ? left-group-weather : ''`}>
        <div className='weather-title'>
          {`Today's Weather`}
        </div>
        <div className='temperature'>
          {`${parseInt(searchResult.temperature)}°`}
        </div>
        <div className='temperature-range'>
          {`H: ${searchResult.high}°  L: ${searchResult.low}°`}
        </div>
        <div className='other-info'>

          {
            (windowWidth <= 500) &&
            <div className='location'>
              {`${searchResult.location}`}
            </div>
          }

          {
            (windowWidth > 500) &&
              <>
                <div className='location'>
                  {`${searchResult.location}`}
                </div>
                <time className='api-datetime' dateTime="2024-02-09T09:41">
                  {`${searchResult.datetime}`}
                </time>

                <div className='humidity'>
                  {`Humidity: ${searchResult.humidity}%`}
                </div>

                <div className='clouds'>
                  {`${searchResult.cloud}`}
                </div>
              </>
          }
        </div>
      </div>
      
      {
        (windowWidth <= 500) &&
        <div className='right-group-weather'>
          <div className='other-info'>

            <div className='temperature'>
              {`${parseInt(searchResult.temperature)}°`}
            </div>
            <div className='clouds'>
              {`${searchResult.cloud}`}
            </div>

            <div className='humidity'>
              {`Humidity: ${searchResult.humidity}%`}
            </div>

            <time className='api-datetime' dateTime="2024-02-09T09:41">
              {`${searchResult.datetime}`}
            </time>
          </div>
        </div>
      }

      </>
    }
    </>
  )
}

export default TodaysWeather
import React, { useCallback, useEffect, useState, useContext } from 'react'
import SearchBar from '../SearchBar/SearchBar'
import DataDisplay from '../DataDisplay/DataDisplay'
import { getWeatherByCity } from '../../api/axios'
import { ThemeContext } from '../../context/ThemeContext.jsx'
import './WeatherApp.css'

function WeatherApp() {

  // States initializations
  const [searchResult, setSearchResult] = useState({
          temperature: 18,
          high: 19,
          low: 17,
          location: `California, USA`,
          cloud: `Clouds`,
          humidity: 50,
          datetime: `01-09-2025 08:16am`
        })
  const [historyList, setHistoryList] = useState([
    { location: `Russia, RU`, datetime: `25-05-2025, 11:48 PM`},
    { location: `California, US`, datetime: `25-05-2025, 11:47 PM`},
    { location: `Germany, DE`, datetime: `25-03-2021, 06:19 PM`},
    { location: `London, UK`, datetime: `10-18-2015, 10:18 PM`},
    { location: `Maldives, MV`, datetime: `18-08-2022, 03:27 PM`},
  ]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { theme, setTheme, toggleTheme } = useContext(ThemeContext);

  // Function handler:
  // Date time converter
  const formatDateTime = (timestamp) => {
    const date = new Date(timestamp * 1000); // convert UNIX seconds to ms

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // months are 0-indexed
    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12; // handle midnight (0 -> 12)
    const formattedHours = String(hours).padStart(2, '0');

    return `${day}-${month}-${year}, ${formattedHours}:${minutes} ${ampm}`;
};

  // Handle GET weather api call
  const getWeather = useCallback(async (city) => {
    try{
      const res = await getWeatherByCity(city)

      // Ensure the response status is within 2xx and 300 range
      if (res.status >= 200 && res.status < 300) {
        var city_name = res.data.name;
        var country = res.data.sys.country;
        var temp = res.data.main.temp;
        var temp_max = Math.floor(res.data.main.temp_max);
        var temp_min = Math.floor(res.data.main.temp_min);
        var humid = Math.floor(res.data.main.humidity);
        var cloud = res.data.weather[0].main;
        var epochtime = res.data.dt;
        
        setSearchResult({
          temperature: temp,
          high: temp_max,
          low: temp_min,
          location: `${city_name}, ${country}`,
          cloud: cloud,
          humidity: humid,
          datetime: formatDateTime(epochtime)
        })
        setError(null);
        setHistoryList(prev => {
          const newHistoryItem = { location: `${city_name}, ${country}`, datetime: formatDateTime(epochtime)};
          const filtered = prev.filter(item => item.location !== newHistoryItem.location);
          var updatedHistoryList = [newHistoryItem, ...filtered];
          localStorage.setItem('weatherHistory', JSON.stringify(updatedHistoryList));
          return updatedHistoryList;
        })
      }
    }
    catch (error) {
      // Normalize different error types
      if (error.response) {
        // Server responded with status code out of 2xx range
        setError(`API Error ${error.response.status}: ${error.response.data?.message || 'Unknown error'}`);
        throw new Error(
          `API Error ${error.response.status}: ${error.response.data?.message || 'Unknown error'}`
        );
      } else if (error.request) {
        // Request was made but no response
        setError('No response from the server. Please check your network.');
        throw new Error('No response from the server. Please check your network.');
      } else {
        // Something else went wrong
        setError('Unexpected error: ' + error.message);
        throw new Error('Unexpected error: ' + error.message);
      }
    }
    finally {
      setLoading(false);
    }
  }, [setSearchResult, setError, setHistoryList, setLoading]);

  // Get history list on load
  useEffect(() => {
    const storedHistoryList = localStorage.getItem('weatherHistory');
    if (storedHistoryList) {
      setHistoryList(JSON.parse(storedHistoryList));
    }
  }, []);

  // Change theme (for testing purpose)
  // useEffect(() => {
  //   setTheme('dark')
  // }, []);
  
  return (
    <main className='weather-app-container'
    style={{
      backgroundImage: 'var(--bg-image)'
    }}
    > 
      <section className='search-section'>
        <SearchBar 
        getWeather={getWeather}
        />
      </section>

      <section className='display-section'>
        <DataDisplay 
        error={error}
        searchResult={searchResult}
        historyList={historyList}
        setHistoryList={setHistoryList}
        getWeather={getWeather}
        />
      </section>
    </main>
  )
}

export default WeatherApp

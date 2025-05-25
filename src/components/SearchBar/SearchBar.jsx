import React, { useCallback, useState, useContext } from 'react'
import { ThemeContext } from '../../context/ThemeContext.jsx'
import './SearchBar.css'

function SearchBar(props) {

  // State initializations
  const { getWeather } = props;
  const [query, setQuery] = useState('');
  const { theme, setTheme, toggleTheme } = useContext(ThemeContext);

  // Function handler:
  // Save user input
  const handleQuery = useCallback((e) => {
    setQuery(e.target.value)
  }, [setQuery]);

  // Handle search button for API calls
  const handleSearch = useCallback(() => {
    if (query) {
      getWeather(query);
    }
  }, [query, getWeather]);

  return (
    <div className='search-container'>

      <div className='input-container'>
        <label className='input-label'>Country</label>
        <input 
        className='search-bar'
        placeholder='Search ...'
        value={query}
        onChange={(e) => handleQuery(e)}
        />
      </div>
      
      <button 
      className='search-button-bar'
      onClick={handleSearch}
      >
        <img
        src={`/search-light.png`}
        alt='Search-Icon'
        className='search-icon' 
        />
        <a href="https://www.flaticon.com/free-icons/discover" title="discover icons"></a>
      </button>

      {/* Theme toggler */}
        <button onClick={toggleTheme} 
        style={{
          backgroundColor: 'var(--color-searchButton)',
          color: 'rgb(255, 255, 255)',
          padding: '1rem 2rem',
          border: 'none',
          outline: 'none',
          borderRadius: '1rem',
          cursor: 'pointer',
          width: '0.5vh',
          fontSize: '2vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onMouseDown={(e) => e.preventDefault()} // prevent focus outline on click
        onFocus={(e) => e.target.style.outline = 'none'}
        >
          {(theme === 'light') ? 'light' : 'dark'}
        </button>
    </div>
  )
}

export default SearchBar
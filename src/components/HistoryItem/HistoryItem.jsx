import React, { useCallback, useEffect, useState, useContext } from 'react'
import { ThemeContext } from '../../context/ThemeContext.jsx'
import './HistoryItem.css'

function HistoryItem(props) {

  // Previously searched data
  const { location, datetime, deleteHistory, searchHistory } = props;

  // states initialization
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { theme, setTheme, toggleTheme } = useContext(ThemeContext);

  // Function handler:
  // Handle delete previous search history
  const deleteHistoryData = useCallback((e) => {
    const city = e.target.closest('li').getAttribute('city');
    deleteHistory(city)
  }, [deleteHistory]);

  // Handle search previous history
  const searchHistoryData = useCallback((e) => {
    const city = e.target.closest('li').getAttribute('city');
    searchHistory(city)
  }, [searchHistory]);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);

    // Cleanup listener on unmount
    return () => window.removeEventListener('resize', handleResize);
  }, [setWindowWidth]);
  
  return (
    <div className='item-container'>

      {
        (windowWidth > 500) &&
        <div className='item-location'>{`${location}`}</div>
      }

      {
        (windowWidth <= 500) &&

        <div className='left-group'>
          <div className='item-location'>{`${location}`}</div>
          <div className='item-datetime'>{`${datetime}`}</div>
        </div>
      }

      <div className='right-group'>
        {
          (windowWidth > 500) &&
          <div className='item-datetime'>{`${datetime}`}</div>
        }

        {/* Search Icon Button */}
        <div className='item-search'>
          <button 
          className='search-button'
          onClick={(e) => searchHistoryData(e)}
          >
            <img
            className='search-icon'
            alt='search-icon'
            src={`${theme === 'light' ? '/search-dark.png' : '/search-light.png'}`}
            />
            <a href="https://www.flaticon.com/free-icons/discover" title="discover icons"></a>
          </button>
        </div>

        {/* Delete Icon Button */}
        <div className='item-trash'>
          <button 
          className='trash-button'
          onClick={(e) => deleteHistoryData(e)}
          >
            <img
            className='trash-icon'
            alt='trash-icon'
            src={`${theme === 'light' ? '/trash-light.png' : '/trash-dark.png'}`}
            />
            <a href="https://www.flaticon.com/free-icons/delete" title="delete icons"></a>
          </button>
        </div>
      </div>
    </div>
  )
}

export default HistoryItem
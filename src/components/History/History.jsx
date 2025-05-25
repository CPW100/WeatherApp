import React, { useCallback, useEffect, useState } from 'react'
import HistoryItem from '../HistoryItem/HistoryItem'
import './History.css'

// History component
function History(props) {

  const { historyList, setHistoryList, getWeather } = props; 

  // Function handler:
  // Handle item deletion from history list
  const delete_history = useCallback((city) => {
    var updatedHistoryList = historyList.filter((item) => item.location !== city);
    setHistoryList(updatedHistoryList);
  }, [historyList, setHistoryList]);

  // Handle search button for API search 
  const searchHistory = useCallback((city) => {
    if (city !== undefined) {
      getWeather(city);
    }
  }, [getWeather, historyList]);

  return (
    <div className='history-container'>
      <div className='history-title'>History</div>
      <ul className='history-menu'>
        {
          (historyList.length > 0) &&
          historyList.map((item, n) => {
            return (
              <li className='menu-item' key={`menu-item-${n}`} city={`${item.location}`}>
                <HistoryItem 
                key={`history-item-${n}`}  
                location={item.location} 
                datetime={item.datetime}
                deleteHistory={delete_history}
                searchHistory={searchHistory}
                />
              </li>
            );
          })
        }
        {
          (historyList.length === 0) &&
          <div className='no-history'>No search history.</div>
        }
      </ul>
    </div>
  )
}

export default History
import React from 'react'
import History from '../History/History'
import TodaysWeather from '../TodaysWeather/TodaysWeather'
import './DataDisplay.css'

// Component that binds 'Today's Weather' and 'History'
function DataDisplay(props) {

  // Weather result and history data
  const { error, searchResult, historyList, setHistoryList, getWeather } = props

  return (
    <main className='data-display-container'>
      <section className='sun-image-section'>
        <img
        src={`/sun.png`}
        alt='sun-image'
        className='sun-img'
        />
      </section>
      <section className='todays-weather'>
        <TodaysWeather 
        error={error}
        searchResult={searchResult}
        />
      </section>

      <section className='history'>
        <History 
        historyList={historyList} 
        setHistoryList={setHistoryList}
        getWeather={getWeather}
        />
      </section>
    </main>
  )
}

export default DataDisplay
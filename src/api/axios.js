// src/api.js
import axios from 'axios';

const API_KEY = '749f374cccdbe1baa583f5369eb45518'; 

const api = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
  params: {
    appid: API_KEY,
    units: 'metric', 
  },
});

export const getWeatherByCity = (city) => {
  return api.get('/weather', {
    params: { q: city },
  });
};

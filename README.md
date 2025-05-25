# Weather App 🌤️

A simple weather search application built with **React** and **Vite**.  
Users can search for weather information by country and toggle between light and dark themes.

## 🚀 Features

- Live weather search by country
- Responsive UI
- Theme toggle (light/dark)
- Styled with custom CSS
- Scrollable history list

## 🛠️ Tech Stack

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- CSS Modules / Custom CSS
- [OpenWeatherMap API](https://openweathermap.org/api) 

## 📦 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/CPW100/WeatherApp.git
cd WeatherApp

2. Install Dependencies
npm install

3. Run the Development Server
npm run dev
Visit http://localhost:5173 to see the app running.

📁 Project Structure
api
src/
├── components/
│   ├── DataDisplay/
│   │   ├── DataDisplay.jsx
│   │   └── DataDisplay.css
│   ├── SearchBar/
│   │   ├── SearchBar.jsx
│   │   └── SearchBar.css
│   ├── History/
│   │   ├── History.jsx
│   │   └── History.css
│   ├── HistoryItem/
│   │   ├── HistoryItem.jsx
│   │   └── HistoryItem.css
│   ├── TodaysWeather/
│   │   ├── TodaysWeather.jsx
│   │   └── TodaysWeather.css
│   ├── WeatherApp/
│   │   ├── WeatherApp.jsx
│   │   └── WeatherApp.css
├── context/
│   └── ThemeContext.jsx
├── App.jsx
├── App.css
├── main.jsx
├── index.css
public/
├── bg-light.png
├── bg-dark.png
├── search-light.png
├── search-dark.png
├── trash-light.png
├── trash-dark.png
├── cloud.png
├── sun.png

Images used in the app is placed in the public/ directory.

📬 Contact
If you encounter any issues or have questions, feel free to reach out!
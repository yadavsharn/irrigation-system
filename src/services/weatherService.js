import axios from 'axios';
const OPENWEATHER_KEY = 'REPLACE_WITH_YOUR_KEY';

async function fetchWeatherForCoordinates(coords){
  if(!coords) return null;
  try{
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&units=metric&appid=${OPENWEATHER_KEY}`;
    const r = await axios.get(url);
    const w = r.data;
    return { temp: Math.round(w.main.temp), summary: w.weather[0].description };
  }catch(e){ console.warn('weather fetch failed', e.message); return null; }
}

export default { fetchWeatherForCoordinates };
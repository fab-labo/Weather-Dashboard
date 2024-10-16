import { Router } from 'express';
import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';
const router = Router();

// import HistoryService from '../../service/historyService.js';
// import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req, res) => {
  
  // TODO: GET weather data from city name
  const city = req.body.cityName;
  const weatherData = await WeatherService.getWeatherForCity(city); 
  res.json(weatherData);

  // TODO: save city to search history
  await HistoryService.addCity(city);
});

// TODO: GET search history
router.get('/history', async (_, res) => {
 const cities = await HistoryService.getCities();
 res.json(cities); 
});

// * BONUS TODO: DELETE city from search history

export default router;

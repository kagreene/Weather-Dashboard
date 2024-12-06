import { Router } from 'express';
const router = Router();
import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';
// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req, res) => {
    // TODO: GET weather data from city name
    console.log(req.body);
    const cityName = req.body.cityName;
    try {
        const weatherData = await WeatherService.getWeatherForCity(cityName);
        // TODO: save city to search history
        await HistoryService.addCity(cityName);
        //Return weather data to client
        res.json(weatherData);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Failed to retrieve weather data' });
    }
});
// TODO: GET search history
router.get('/history', async (_req, res) => {
    try {
        const savedCities = await HistoryService.getCities();
        res.json(savedCities);
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});
// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (_req, _res) => { });
export default router;

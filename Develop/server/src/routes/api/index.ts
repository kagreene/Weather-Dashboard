import { Router } from 'express';
const fs = require('fs');
const router = Router();

import weatherRoutes from './weatherRoutes.js';

router.use('/weather', weatherRoutes);

//Do these go in this file?? Or in the weather routes file?? 
//Add GET /api/weather/history route that reads the searchHistory.json file and returns all saved cities as JSON

router.get('/api/weather/history', (req, res) => {
    fs.readFile()
}
)
//add POST /api/weather route 
export default router;

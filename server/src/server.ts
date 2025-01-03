import dotenv from 'dotenv';
import express from 'express';
import path from 'path';


dotenv.config();
// Import the routes
import routes from './routes/index.js';
const app = express();
const PORT = process.env.PORT || 3001;

app.use((req, _res, next) => {
    console.log(`Request URL: ${req.url}`);
    next();
  });
// TODO: Serve static files of entire client dist folder
app.use(express.static( '../client/dist'))
// TODO: Implement middleware for parsing JSON and urlencoded form data
//Look at Activity 25 for middleware examples 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// TODO: Implement middleware to connect the routes
app.use(routes);
// Start the server on the port
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));

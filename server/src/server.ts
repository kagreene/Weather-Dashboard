import dotenv from 'dotenv';
import express from 'express';



dotenv.config();
// Import the routes
import routes from './routes/index.js';
const app = express();
const PORT = process.env.PORT || 3001;
// TODO: Serve static files of entire client dist folder
<<<<<<<< HEAD:server/dist/server.js
app.use(express.static('../../client/dist'));
========
app.use(express.static( '../../client/dist'))
>>>>>>>> e4e7597ccb2f98c9b5aa9583a7a00329ee6bb1f6:server/src/server.ts
// TODO: Implement middleware for parsing JSON and urlencoded form data
//Look at Activity 25 for middleware examples 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// TODO: Implement middleware to connect the routes
app.use(routes);
// Start the server on the port
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));

import Server from './classes/server';
import { SERVER_PORT } from './global/enviroment';
import router from './routes/router';

import bodyParser from 'body-parser';

import cors from 'cors';

const server = Server.instance;

//Body Parser
server.app.use(bodyParser.urlencoded({ extended: true}));
server.app.use( bodyParser.json());

//CORS
server.app.use( cors({ origin: true, credentials: true}))


// Rutas de Servicios
server.app.use('/', router );

server.start(() => {
   console.log('El servidor esta corriendo en el puerto: ' + SERVER_PORT);  
});
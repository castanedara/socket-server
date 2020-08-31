import express from 'express';
import { SERVER_PORT } from '../global/enviroment';
import SocketIO from 'socket.io'
import http from 'http';

import * as socket from '../sockets/socket';

export default class Server {

    private static _instance: Server;

    public app: express.Application;
    public port: number;

    private httpServer: http.Server;
    public io: SocketIO.Server;

    private constructor(){
        
        this.app = express();
        this.port = SERVER_PORT;

        this.httpServer =  new http.Server( this.app );
        this.io =  SocketIO(this.httpServer);

        this.escucharSockets();
        
    }

    public static get instance() {
        return this._instance || (this._instance = new this());
    }

    private escucharSockets() {
        console.log("Escuchando conexiones = sockets");
        
        this.io.on('connection', cliente => {
            console.log('cliente conectado');

            socket.mensaje(cliente, this.io);

            socket.desconectar(cliente);
        });
    }


    start(callback: Function){
        this.httpServer.listen(this.port,  callback());
    }


}
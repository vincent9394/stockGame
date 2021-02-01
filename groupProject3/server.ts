import express from 'express'
import path from 'path'
import Knex from 'knex'
import expressSession from 'express-session'
import http from 'http'
import { Server as SocketIO } from 'socket.io'
import bodyParser from 'body-parser'
import { routes } from './routes'
import { Router } from './routes'

export function createApp(knex: Knex) {
    const app = express();

    // setup socket.io
    const server = new http.Server(app)
    const io = new SocketIO(server);

    // setup session for socket.io
    const sessionMiddleware = expressSession({
        secret: 'No real secret',
        resave: true,
        saveUninitialized: true,
        cookie: { secure: false }
    });
    app.use(sessionMiddleware);

    // setup middleware
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    io.use((socket, next) => {
        const request = socket.request as express.Request;
        sessionMiddleware(request, request.res as express.Response, next as express.NextFunction);
    })

    // setup routes
    app.use('/', routes);
    app.use(express.static(path.resolve('./public')));
    app.use((req, res, next) => {
        res.sendFile(path.resolve('./public/404.html'))
    });

    // return app
    return app;
}
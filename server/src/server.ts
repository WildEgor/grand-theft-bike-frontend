import App from './app';
import { Response, Request } from "express";

const server = new App();

server.app.get('/', (req: Request, res: Response) => {
    res.send(req.body)
})

process.on('SIGTERM', server.shutDown);
process.on('SIGINT', server.shutDown);

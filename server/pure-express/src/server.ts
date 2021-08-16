import App from './app';
//import { Response, Request } from "express";
import { AuthController, OfficerController, ReportController, CaseController, } from "./controllers";

const server = new App([
    new AuthController(),
    new OfficerController(),
    new ReportController(),
    new CaseController(),
]);

// server.app.get('/', (req: Request, res: Response) => {
//     res.send(req.body)
// })

process.on('SIGTERM', server.shutDown);
process.on('SIGINT', server.shutDown);

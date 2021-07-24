import {Request, Response, NextFunction, Application} from "express";
import log from "../dev/logger";

function loggerMiddleware(request: Request, response: Response, next: NextFunction) {
    log.info(`${request.method} ${request.path}`);
    next();
}

export = (app: Application) => {
    app.use(loggerMiddleware)
}
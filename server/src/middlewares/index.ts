import logger from "./logger";
import common from "./common";
import { Application } from "express";

const middlewares = [
    common,
    logger
];

export default (app: Application) => middlewares.forEach((middleware) => middleware(app));
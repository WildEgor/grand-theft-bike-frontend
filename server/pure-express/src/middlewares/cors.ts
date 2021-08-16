import cors from 'cors';
import { Application } from "express";

const settings = {
    origin: '*',
    optionsSuccessStatus: 200,
};

export = (app: Application) => {
    app.use(cors(settings));
};
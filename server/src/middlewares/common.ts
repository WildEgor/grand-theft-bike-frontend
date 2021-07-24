import express from "express";
import helmet from "helmet";

export = (app: express.Application) => {
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(helmet());
}
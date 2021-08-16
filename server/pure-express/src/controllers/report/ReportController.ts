import { Request, Response, NextFunction, Router } from 'express';
import Controller from "../../interfaces/controller.interface";

class ReportController implements Controller {
    public path = '/public/report';
    public router = Router();

    constructor(){

    }
}

export default ReportController;
import { Request, Response, NextFunction, Router } from 'express';
import Controller from "../../interfaces/controller.interface";

class CaseController implements Controller {
    public path = '/api/cases';
    public router = Router();

    constructor(){

    }
}

export default CaseController;
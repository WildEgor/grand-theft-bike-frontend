import { Request, Response, NextFunction, Router } from 'express';
import Controller from "../../interfaces/controller.interface";

class OfficerController implements Controller {
    public path = '/officers';
    public router = Router();

    constructor(){

    }
}

export default OfficerController;
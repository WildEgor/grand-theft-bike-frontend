import { Request, Response, NextFunction, Router } from 'express';
import Controller from "../../interfaces/controller.interface";
// import AuthService from "../../services/auth/AuthService";
import validationMiddleware from "../../middlewares/validation";
import CreateUserDto from "../../models/User/user.dto";

class AuthController implements Controller {
    public path = '/auth';
    public router = Router();

    constructor(){
        this.initializeRoutes()
    }

    private initializeRoutes() {
        this.router.post(`${this.path}/sign_in`, validationMiddleware(CreateUserDto), this.login)
        this.router.post(`${this.path}/sign_up`, validationMiddleware(CreateUserDto), this.register)
        this.router.post(`${this.path}/logout`, validationMiddleware(CreateUserDto), this.logout)
    }

    login = (request: Request, response: Response, next: NextFunction) => {
        // AuthService.login()
    }

    register = (request: Request, response: Response, next: NextFunction) => {
        // AuthService.register()
    }

    logout = (request: Request, response: Response, next: NextFunction) => {
        // AuthService.logout()
    }
}

export default AuthController;
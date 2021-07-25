import passport from 'passport';
import standarts from '../../config/standarts';
import errors from '../../config/errors';
import { Request, Response, NextFunction } from "express";

module.exports = {
    auth(req: Request, res: Response, next: NextFunction) {
        const response = Object.create(standarts.standartResponse);
        passport.authenticate('jwt', {}, (err: Error, user: any) => {
            if (err) errors.unknownError(req, res, err);

            if (user) {
                return next();
            }
            response.success = false;
            response.msg = 'User credentials invalid';

            return res.status(401).json(response);
        })(req, res, next);
    },
    test(req: Request, res: Response) {
        res.send('Authenticated!');
    },
};
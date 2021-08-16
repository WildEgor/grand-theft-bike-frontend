import standarts from '../standarts';
import log from '../../dev/logger';
import { Request, Response } from "express";

const errors = {
    unknownError: function (req: Request, res: Response, err: Error) {
        const response = Object.create(standarts.standartResponse);

        response.success = false;
        response.msg = err.message;
        response.content = err;

        res.status(500).json(response);

        log.error('Unknown Error: %O', { body: req.body, response });
    },
}

export default errors;

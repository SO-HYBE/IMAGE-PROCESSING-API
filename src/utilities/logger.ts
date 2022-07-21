import express, { NextFunction } from 'express';

const logger = (
    req: express.Request,
    res: express.Response,
    next: NextFunction
): void => {
    const url = req.url;
    console.log(`${url} was visited`);
    next();
};

export default logger;

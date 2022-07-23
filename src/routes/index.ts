import express from 'express';
import myApp from './api/myApi';

const routes = express.Router();

routes.get('/', (req, res): void => {
    res.send('Main API route.');
});
routes.use('/myApp', myApp);

export default routes;

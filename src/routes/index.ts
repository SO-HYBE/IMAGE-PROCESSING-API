import express from 'express';
import myApp from './api/function';

const routes = express.Router();

routes.get('/', (req, res) => {
    res.send('Main API route.');
});
routes.use('/myApp', myApp);

export default routes;

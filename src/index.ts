import express from 'express';
import routes from './routes';
import logger from './utilities/logger';
const app = express();
const port = 3000;

app.use('/', logger, routes);

app.listen(port, () => {
    console.log(`https://localhost:${port}`);
});

export default app;

import express from 'express';
import sharp from 'sharp';
import logger from '../../utilities/logger';
import fs from 'fs';
const myApp = express.Router();

myApp.get('/process', logger, async (req, res) => {
    const filename = req.query.filename;
    const width = parseInt(req.query.width as string);
    const height = parseInt(req.query.height as string);
    const inputFile = `./images/${filename}.jpg`;
    if (!fs.existsSync(`./thumb/${filename}_thumb.jpg`)) {
        sharp(inputFile)
            .resize(width as unknown as number, height as unknown as number)
            .toFile(`./thumb/${filename}_thumb.jpg`, function (err, info) {
                console.log(info);
            });
        setTimeout(() => {
            res.sendFile(
                `./thumb/${req.query.filename}_thumb.jpg`,
                { root: './' },
                (err) => {
                    console.log(err);
                    return;
                }
            );
        }, 500);
    } else {
        res.sendFile(
            `./thumb/${req.query.filename}_thumb.jpg`,
            { root: './' },
            (err) => {
                console.log(err);
                return;
            }
        );
    }
});

export default myApp;

import express from 'express';
import logger from '../../utilities/logger';
import fs from 'fs';
import imgFunc from '../../funtion';
const myApp = express.Router();
myApp.get('/process', logger, async (req, res) => {
    const filename = req.query.filename;
    const width = parseInt(req.query.width as string);
    const height = parseInt(req.query.height as string);
    const inputFile = `./images/${filename}.jpg`;
    const outputFile =
        `./thumb/${filename}_thumb` + '-' + width + 'x' + height + '.jpg';
    if (!fs.existsSync(inputFile)) {
        res.send("Error: This image doesn't exist.");
    } else if (isNaN(width) && isNaN(height)) {
        res.send(
            'Error: Please enter a number as the width and the height parameters.'
        );
    } else if (!width || !height || !filename) {
        res.send(
            'Error: Please make sure that you entered the width, height, and filename to complete the process.'
        );
    } else if (width < 0 || height < 0) {
        res.send('Error: Please enter a valid width and height number.');
    } else {
        if (!fs.existsSync(outputFile)) {
            imgFunc(width, height, inputFile, outputFile).then(() => {
                setTimeout(() => {
                    res.status(200).sendFile(
                        outputFile,
                        { root: './' },
                        (err) => {
                            if (err) {
                                console.log(err);
                            }
                            return;
                        }
                    );
                }, 300);
            });
        } else {
            res.status(200).sendFile(outputFile, { root: './' }, (err) => {
                if (err) {
                    console.log(err);
                }
                return;
            });
        }
    }
});

export default myApp;

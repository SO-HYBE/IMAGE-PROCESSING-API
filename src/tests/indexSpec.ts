import app from '../index';
import fs from 'fs';
import supertest from 'supertest';
import { Request } from 'express';

const request = supertest(app);
describe('I- A test for my endpoint', () => {
    it('1. tests the api endpoint status', async () => {
        const response = await request.get('/');
        expect(response.status).toBe(200);
    });
    it('2. tests successful access to the api endpoint ', async () => {
        const response = await request.get('/');
        expect(response.status === 400).toBeFalsy();
    });
});

describe("II- Test for my application's functionality", () => {
    it('1. tests the availability of the thumbnail image in the thumb folder', () => {
        expect(
            app.get('/process', (req) =>
                fs.readdirSync(
                    `./thumb/${req.query.filename}_thumb` +
                        '-' +
                        req.query.width +
                        'x' +
                        req.query.height +
                        '.jpg'
                )
            )
        ).toBeTruthy();
    });
    it('2. test the resizing of the thumbnail image', () => {
        app.get('/process', function testImg(req: Request) {
            const thumbInfo = fs.statSync(
                `./thumb/${req.query.filename}_thumb` +
                    '-' +
                    req.query.width +
                    'x' +
                    req.query.height +
                    '.jpg'
            );
            const thumbSize = thumbInfo.size;
            const imgInfo = fs.statSync(`./images/${req.query.filename}.jpg`);
            const imgSize = imgInfo.size;
            expect(imgSize).toBeGreaterThan(thumbSize);
        });
    });
});

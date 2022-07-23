import app from '../index';
import fs from 'fs';
import supertest from 'supertest';
import { Request } from 'express';
import imgFunc from '../funtion';
const request = supertest(app);
describe('I- A test for my endpoint', (): void => {
    it('1. tests the api endpoint status', async (): Promise<void> => {
        const response = await request.get('/');
        expect(response.status).toBe(200);
    });
    it('2. tests successful access to the api endpoint ', async (): Promise<void> => {
        const response = await request.get('/');
        expect(response.status === 400).toBeFalsy();
    });
});

describe("II- Test for my application's functionality", (): void => {
    it('1. tests the availability of the thumbnail image in the thumb folder', () => {
        expect(
            app.get('/process', (req: Request): string[] =>
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
    it('2. tests the resizing of the thumbnail image', (): void => {
        app.get('/process', function testImg(req: Request): void {
            const thumbInfo: fs.Stats = fs.statSync(
                `./thumb/${req.query.filename}_thumb` +
                    '-' +
                    req.query.width +
                    'x' +
                    req.query.height +
                    '.jpg'
            );
            const thumbSize: number = thumbInfo.size;
            const imgInfo: fs.Stats = fs.statSync(
                `./images/${req.query.filename}.jpg`
            );
            const imgSize: number = imgInfo.size;
            expect(imgSize).toBeGreaterThan(thumbSize);
        });
    });
    it('3. tests the functionality of the image resizing function.', (): void => {
        app.get('/process', async function testImg(req: Request) {
            const width = parseInt(req.query.width as string);
            const height = parseInt(req.query.height as string);
            const filePath: string =
                await (`./thumb/${req.query.filename}_thumb` +
                    '-' +
                    width +
                    'x' +
                    height +
                    '.jpg');
            const inputImg: string = await `./images/${req.query.filename}.jpg`;

            if (fs.statSync(filePath)) {
                fs.unlinkSync(filePath);
            }
            imgFunc(width, height, inputImg, filePath);
            expect(
                fs.statSync(
                    `./thumb/${req.query.filename}_thumb` +
                        '-' +
                        width +
                        'x' +
                        height +
                        '.jpg'
                )
            ).toBeTruthy();
        });
    });
});

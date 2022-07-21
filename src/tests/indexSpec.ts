import app from '../index';
import fs from 'fs';
import supertest from 'supertest';
const request = supertest(app);
describe('I- A test for my endpoint', () => {
    it('1. tests the api endpoint status', async () => {
        const response = await request.get('/');
        expect(response.status).toBe(200);
    });
});

const thumbInfo = fs.statSync(`./thumb/${fs.readdirSync('./thumb/')[0]}`);
const thumbSize = thumbInfo.size;
const imgInfo = fs.statSync(`./images/${fs.readdirSync('./images/')[0]}`);
const imgSize = imgInfo.size;
describe("II- Test for my application's functionality", () => {
    it('1. tests the availability of the thumbnail image in the thumb folder', () => {
        expect(
            app.get(
                '/process',
                (req) => `./thumb/${req.query.filename}_thumb.jpg`
            )
        ).toBeTruthy();
    });
    it('2. test the resizing of the thumbnail image', () => {
        expect(imgSize).toBeGreaterThan(thumbSize);
    });
});

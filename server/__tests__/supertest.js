const request = require('supertest');
const fs = require('fs');
const path = require('path');
const express = require('express');

const server = 'http://localhost:3000';
const app = express();
const testJsonFile = path.join(__dirname, 'test.json');


describe('Route integration', () => {
    
    describe('/', () => {
        describe('GET', () => {
            it('responds with 200 status and text/html content type', () => {
                return request(server)
                    .get('/')
                    .expect('Content-Type', /text\/html/)
                    .expect(200);
            })
        })
        // post pets to main page with status and json file
        describe('POST', () => {
            it('response with 200 status and application/json content type', () => {
                const postDB = [{"test": "does this work"}, {"name": 'Poppy'}];
                return request(server)
                    .post('/')
                    .send(postDB)
                    .then((res) => {
                        expect(res.body).toEqual(postDB)
                    });
            });
        });
    });
    
    describe('/login', () => {
        describe('GET', () => {
            it('responses with 200 status and application/json content type', () => {
                return request(server)
                .get('/login')
                .expect('Content-Type', /json/)
                .expect(200);
            });
        })
    })

    describe('/signup', () => {
        describe('GET', () => {
            it('responses with 200 status and application/json content type', () => {
                return request(server)
                .get('/login')
                .expect('Content-Type', /json/)
                .expect(200);
            });
        })
    })

    describe('/pet', () => {
        describe('GET', () => {
            it('responses with 200 status and application/json content type', () => {
                return request(server)
                .get('/pet')
                .expect('Content-Type', /json/)
                .expect(200);
            });
            it('user associated with pet in db are in body of response', () => {
                const userid = JSON.parse(fs.readFileSync(testJsonFile));
                return request(server)
                .get('/pet')
                .expect(userid);
            })
        })
        //patch to db that component in obj is updated
        describe('PATCH', () => {
            it('response with 200 status and application/json content type', () => {
                const postPatch = [{"test": "does this patch work"}];
                return request(server)
                    .patch('/pet')
                    .send(postPatch)
                    .then((res) => {
                        expect(res.body).toEqual(postPatch)
                    });
            });
        })
    })
})
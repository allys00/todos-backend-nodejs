const { app } = require('../../server');
const request = require('supertest');
const truncate = require('../utils/truncate');
const bcrypt = require('bcrypt');
const factory = require('../factories');


describe('Authentication', () => {
    beforeEach(async () => {
        await truncate();
    })

    it('should authenticate with valid crendentials', async () => {
        const user = await factory.create('User', { password: '123456' });
        const response = await request(app)
            .post('/api/auth/login')
            .send({
                email: user.email,
                password: '123456'
            });

        expect(response.status).toBe(200);
    });

    it('should error with invalid crendentials', async () => {
        const user = await factory.create('User', { password: '123456' });
        const response = await request(app)
            .post('/api/auth/login')
            .send({
                email: user.email,
                password: '654321'
            });

        expect(response.status).toBe(400);
    });
    
});
const request = require('supertest')
const app = require('./app.js')
describe('Check routes', () => {
    beforeAll(done => {
        done()
    })


    afterAll(done => {
        // Closing the DB connection allows Jest to exit successfully.
        server.close();
        done()
    })

    it('success get task id', async () => {
        const res = await request(app)
            .get('/task/5fd220fb8541d83690cf8ee8')
        expect(res.statusCode).toEqual(200);
    }, 30000)

    it('should create a new post', async () => {
        const res = await request(app)
            .get('/task')
        expect(res.statusCode).toEqual(200);
    }, 30000)

    it('success add task', async () => {
        const res = await request(app)
            .post('/task')
        expect(res.statusCode).toEqual(200);
    }, 30000)

    it('success delete task', async () => {
        const res = await request(app)
            .get('/deleteTask/5fd220fb8541d83690cf8ee8')
        expect(res.statusCode).toEqual(200);
    }, 30000)

})
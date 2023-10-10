const request = require('supertest')
const express = require('express')
const app = express()
const router = express.Router()
const {
    uploadVehicleData,
    getAllData,
    getDataPoint,
    getTimedData,
    getLatestDataPoint,
    getNLatestData,
    deleteDataPoint,
    updateDataPoint,
    deleteAllData,
    getTimedDataRange,
    getTimedDataStart,
} = require('../controllers/vehicleDataController')

app.use('/api', router);
router.get('/data', getAllData);

app.use('/api', router);
router.get('/data', getAllData);

describe('GET /api/data', () => {
  it('should return a 200 status code and an array of vehicle data', async () => {
    const response = await request(app).get('/api/data');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});
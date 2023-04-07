const request = require("supertest");
const server = require("../server.js");

require("dotenv").config();

beforeEach(async () => {
    //Clear the database
    await request(server).get("/clearData");
});

describe("Test that API functions are accessible", () => {
    it("/getData", async () => {
        const res = await request(server).get("/getData");
        expect(res.statusCode).toBe(202);
        console.log(res.body);
    });

    it("/clearData", async () => {
        const res = await request(server).get("/clearData");
        expect(res.statusCode).toBe(401);
        console.log(res.body);
    });

    it("/newData", async () => {
        const res = await request(server).post("/newData");
        expect(res.statusCode).toBe(500);
        console.log(res.body);
    });
});

describe("Test that we can add and retrieve data", () => {
    it("t1", async () => {
        const res = await request(server).post("/newData").send({
            "timestamp": "2021-03-26 12:00:00",
            "vehicleId": "1",
            "obd": {
                "WheelBasedVehicleSpeed": 0,
                "EngineSpeed": 0,
            },
            "misc": {
                "hydrogenLevel": 98,
                "CurrentMPG" : 59,
                "fuelSaving" : 38,
                "CO2Reductions" : 9,
            }
        });
        console.log(res.body);
        expect(res.statusCode).toBe(200);

        const res2 = await request(server).get("/getData");
        expect(res.statusCode).toBe(200);
        console.log(res.body);
    });
});

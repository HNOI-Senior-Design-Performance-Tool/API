# API
A repo to hold the nodeJS backend of the system.
## Usage
### Adding new data
To add data to the database, using the API, you need to send a POST request to the server with the following format:
```
{
    timestamp: 2012-04-23T18:25:43.511Z,
    vehicleId: 1,
    obd: {Full OBD data},
    misc: {
        hydrogenLevel: "75",
        ...
    }
}
```
#### Using python
Following is an example of how to send a POST request using pyhon:
```
import requests
import json

# Server URL yet to be acquired but should be something like:
url = "http://localhost:3000/newData"

# OBD data should just be added as it comes from the OBD (following is just an example)
payload = {
    "timestamp": "2012-04-23T18:25:43.511Z",
    "vehicleId": 1,
    "obd": {
        "speed": 0,
        "rpm": 0,
        "throttle": 0,
        "engineLoad": 0,
        "coolantTemp": 0,
        "fuelPressure": 0,
        "intakePressure": 0,
        "intakeTemp": 0,
        "maf": 0,
        "fuelLevel": 0,
        "barometricPressure": 0,
        "timingAdvance": 0,
        "airFuelRatio": 0,
        "fuelRate": 0
    },
    "misc": {
        "hydrogenLevel": "75"
    }

# Send the request
r = requests.post(url, data=json.dumps(payload))

# Print the response (Could be used to check if the request was successful)
print(r.statusCode)
```
The request should return a JSON object with the following format:
```
{
    "statusCode": 400 || 200,
    "message": "Error message" || "Success message"

}
```
